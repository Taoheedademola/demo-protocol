// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract RewardsToken is ERC20Capped, ERC20Burnable, Ownable, ReentrancyGuard {
    mapping(address => uint256) public rewards;

    constructor(
        uint256 cap
    )
        ERC20("Rewards Token", "RWD")
        ERC20Capped(cap * 1e18)
        Ownable(msg.sender)
    {
        _mint(msg.sender, cap * 1e18); // ✅ Keep this
    }

    function setReward(address user, uint256 amount) external onlyOwner {
        rewards[user] += amount;
    }

    function claimReward() external nonReentrant {
        uint256 reward = rewards[msg.sender];
        require(reward > 0, "No reward to claim");

        rewards[msg.sender] = 0;
        _mint(msg.sender, reward); // ✅ Make sure total minted doesn't exceed the cap
    }

    function _update(
        address from,
        address to,
        uint256 value
    ) internal override(ERC20, ERC20Capped) {
        super._update(from, to, value);
    }
}
