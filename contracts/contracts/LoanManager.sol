// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface ILendingVault {
    function balances(
        address token,
        address user
    ) external view returns (uint256);
    function withdraw(address token, uint256 amount) external;
    function supply(address token, uint256 amount) external;
}

contract LoanManager is ReentrancyGuard {
    address public admin;
    ILendingVault public vault;

    uint256 public collateralRatio = 150;
    uint256 public interestRatePerSecond = 1e14;
    uint256 public liquidationThreshold = 120;

    struct Loan {
        uint256 borrowedAmount;
        uint256 timestamp;
        bool isActive;
        uint256 collateralAmount;
        address collateralToken;
    }

    mapping(address => mapping(address => Loan)) public loans;

    event Borrowed(address indexed user, address indexed token, uint256 amount);
    event Repaid(
        address indexed user,
        address indexed token,
        uint256 amount,
        bool fullyRepaid
    );
    event Liquidated(
        address indexed user,
        address indexed token,
        uint256 amount
    );

    constructor(address _vault) {
        admin = msg.sender;
        vault = ILendingVault(_vault);
    }

    function borrow(
        address borrowToken,
        uint256 amount,
        address collateralToken,
        uint256 collateralAmount
    ) external nonReentrant {
        require(amount > 0 && collateralAmount > 0, "Invalid values");
        require(
            !loans[msg.sender][borrowToken].isActive,
            "Loan already active"
        );

        uint256 requiredCollateral = (amount * collateralRatio) / 100;
        require(
            collateralAmount >= requiredCollateral,
            "Insufficient collateral"
        );

        require(
            IERC20(borrowToken).balanceOf(address(vault)) >= amount,
            "Vault insufficient"
        );

        IERC20(collateralToken).transferFrom(
            msg.sender,
            address(vault),
            collateralAmount
        );
        vault.supply(collateralToken, collateralAmount);

        loans[msg.sender][borrowToken] = Loan({
            borrowedAmount: amount,
            timestamp: block.timestamp,
            isActive: true,
            collateralAmount: collateralAmount,
            collateralToken: collateralToken
        });

        IERC20(borrowToken).transfer(msg.sender, amount);
        emit Borrowed(msg.sender, borrowToken, amount);
    }

    function repay(address token, uint256 amount) external nonReentrant {
        Loan storage loan = loans[msg.sender][token];
        require(loan.isActive, "No active loan");

        uint256 interest = calculateInterest(loan);
        uint256 totalOwed = loan.borrowedAmount + interest;
        require(amount <= totalOwed, "Repaying too much");

        IERC20(token).transferFrom(msg.sender, address(vault), amount);

        if (amount >= totalOwed) {
            vault.withdraw(loan.collateralToken, loan.collateralAmount);
            IERC20(loan.collateralToken).transfer(
                msg.sender,
                loan.collateralAmount
            );
            delete loans[msg.sender][token];
            emit Repaid(msg.sender, token, amount, true);
        } else {
            loan.borrowedAmount = totalOwed - amount;
            loan.timestamp = block.timestamp;
            emit Repaid(msg.sender, token, amount, false);
        }
    }

    function liquidate(address user, address token) external nonReentrant {
        Loan storage loan = loans[user][token];
        require(loan.isActive, "No active loan");

        uint256 interest = calculateInterest(loan);
        uint256 totalDebt = loan.borrowedAmount + interest;

        uint256 ratio = (loan.collateralAmount * 100) / totalDebt;
        require(ratio < liquidationThreshold, "Loan healthy");

        vault.withdraw(loan.collateralToken, loan.collateralAmount);
        IERC20(loan.collateralToken).transfer(admin, loan.collateralAmount);

        delete loans[user][token];
        emit Liquidated(user, token, totalDebt);
    }

    function calculateInterest(Loan memory loan) public view returns (uint256) {
        uint256 duration = block.timestamp - loan.timestamp;
        return (loan.borrowedAmount * interestRatePerSecond * duration) / 1e18;
    }

    function hasUnpaidLoan(
        address user,
        address token
    ) external view returns (bool) {
        return loans[user][token].isActive;
    }

    function getBorrowedAmount(
        address user,
        address token
    ) external view returns (uint256) {
        return loans[user][token].borrowedAmount;
    }

    function getLoanInfo(
        address user,
        address token
    )
        external
        view
        returns (
            uint256 borrowedAmount,
            uint256 interest,
            uint256 collateralAmount,
            address collateralToken,
            uint256 timestamp,
            bool isActive
        )
    {
        Loan memory loan = loans[user][token];
        borrowedAmount = loan.borrowedAmount;
        interest = calculateInterest(loan);
        collateralAmount = loan.collateralAmount;
        collateralToken = loan.collateralToken;
        timestamp = loan.timestamp;
        isActive = loan.isActive;
    }
}
