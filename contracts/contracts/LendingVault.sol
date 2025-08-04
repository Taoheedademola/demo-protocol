// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface ILoanManager {
    function hasUnpaidLoan(
        address user,
        address token
    ) external view returns (bool);
}

contract LendingVault is ReentrancyGuard {
    address public admin;
    ILoanManager public loanManager;

    mapping(address => mapping(address => uint256)) public balances;
    mapping(address => address[]) public suppliers;

    event Supplied(address indexed user, address indexed token, uint256 amount);
    event Withdrawn(
        address indexed user,
        address indexed token,
        uint256 amount
    );

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not admin");
        _;
    }

    function setLoanManager(address _loanManager) external onlyAdmin {
        require(address(loanManager) == address(0), "Already set");
        loanManager = ILoanManager(_loanManager);
    }

    function supply(address token, uint256 amount) external nonReentrant {
        require(amount > 0, "Amount must be > 0");
        IERC20(token).transferFrom(msg.sender, address(this), amount);

        if (balances[token][msg.sender] == 0) {
            suppliers[token].push(msg.sender);
        }

        balances[token][msg.sender] += amount;
        emit Supplied(msg.sender, token, amount);
    }

    function withdraw(address token, uint256 amount) external nonReentrant {
        require(amount > 0, "Amount must be > 0");
        require(balances[token][msg.sender] >= amount, "Insufficient");

        if (address(loanManager) != address(0)) {
            require(
                !loanManager.hasUnpaidLoan(msg.sender, token),
                "Unpaid loan"
            );
        }

        balances[token][msg.sender] -= amount;
        IERC20(token).transfer(msg.sender, amount);
        emit Withdrawn(msg.sender, token, amount);
    }

    function getSuppliedBalance(
        address token,
        address user
    ) external view returns (uint256) {
        return balances[token][user];
    }

    function getTotalSupplied(
        address token
    ) external view returns (uint256 total) {
        for (uint256 i = 0; i < suppliers[token].length; i++) {
            total += balances[token][suppliers[token][i]];
        }
    }
}
