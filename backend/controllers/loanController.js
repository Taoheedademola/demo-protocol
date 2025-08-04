import { ethers } from "ethers";
import { getContract } from "../utils/getContract.js";
import { web3Provider } from "../utils/provider.js";

// --- LendingVault Functions ---

export const supplyTokens = async (req, res) => {
  try {
    const { userAddress, amount } = req.body;
    if (!userAddress || !amount)
      return res.status(400).json({ error: "Missing fields" });

    const lendingVault = getContract("LendingVault");
    const parsedAmount = ethers.utils.parseEther(amount.toString());

    const tx = await lendingVault.supply(parsedAmount, { from: userAddress });
    await tx.wait();

    res.status(200).json({ message: "Tokens supplied", txHash: tx.hash });
  } catch (err) {
    console.error("Supply error:", err);
    res.status(500).json({ error: "Supply failed" });
  }
};

export const withdrawTokens = async (req, res) => {
  try {
    const { userAddress, amount } = req.body;
    if (!userAddress || !amount)
      return res.status(400).json({ error: "Missing fields" });

    const lendingVault = getContract("LendingVault");
    const parsedAmount = ethers.utils.parseEther(amount.toString());

    const tx = await lendingVault.withdraw(parsedAmount, { from: userAddress });
    await tx.wait();

    res.status(200).json({ message: "Tokens withdrawn", txHash: tx.hash });
  } catch (err) {
    console.error("Withdraw error:", err);
    res.status(500).json({ error: "Withdraw failed" });
  }
};

// --- LoanManager Functions ---

export const createLoanOffer = async (req, res) => {
  try {
    const { lender, amount, interestRate, duration } = req.body;
    if (!lender || !amount || !interestRate || !duration)
      return res.status(400).json({ error: "Missing fields" });

    const loanManager = getContract("LoanManager");
    const parsedAmount = ethers.utils.parseEther(amount.toString());

    const tx = await loanManager.createLoanOffer(
      parsedAmount,
      interestRate,
      duration,
      {
        from: lender,
      }
    );
    await tx.wait();

    res.status(200).json({ message: "Loan offer created", txHash: tx.hash });
  } catch (err) {
    console.error("Loan offer error:", err);
    res.status(500).json({ error: "Loan offer creation failed" });
  }
};

export const acceptLoan = async (req, res) => {
  try {
    const { offerId, borrower } = req.body;
    if (!offerId || !borrower)
      return res.status(400).json({ error: "Missing fields" });

    const loanManager = getContract("LoanManager");

    const tx = await loanManager.acceptLoan(offerId, { from: borrower });
    await tx.wait();

    res.status(200).json({ message: "Loan accepted", txHash: tx.hash });
  } catch (err) {
    console.error("Accept loan error:", err);
    res.status(500).json({ error: "Loan acceptance failed" });
  }
};

export const repayLoan = async (req, res) => {
  try {
    const { loanId, borrower, repayAmount } = req.body;
    if (!loanId || !borrower || !repayAmount)
      return res.status(400).json({ error: "Missing fields" });

    const loanManager = getContract("LoanManager");
    const parsedAmount = ethers.utils.parseEther(repayAmount.toString());

    const tx = await loanManager.repayLoan(loanId, parsedAmount, {
      from: borrower,
    });
    await tx.wait();

    res.status(200).json({ message: "Loan repaid", txHash: tx.hash });
  } catch (err) {
    console.error("Repay error:", err);
    res.status(500).json({ error: "Repayment failed" });
  }
};

// --- Rewards Functions ---

export const claimRewards = async (req, res) => {
  try {
    const { userAddress } = req.body;
    if (!userAddress) return res.status(400).json({ error: "Missing address" });

    const rewardsContract = getContract("Reward");

    const tx = await rewardsContract.claimRewards({ from: userAddress });
    await tx.wait();

    res.status(200).json({ message: "Rewards claimed", txHash: tx.hash });
  } catch (err) {
    console.error("Claim error:", err);
    res.status(500).json({ error: "Reward claim failed" });
  }
};

export const getRewardBalance = async (req, res) => {
  try {
    const userAddress = req.params.user;
    if (!userAddress) return res.status(400).json({ error: "Missing address" });

    const rewardsContract = getContract("Reward");

    const balance = await rewardsContract.getRewardBalance(userAddress);
    const formatted = ethers.utils.formatEther(balance);

    res.status(200).json({ balance: formatted });
  } catch (err) {
    console.error("Get reward error:", err);
    res.status(500).json({ error: "Failed to fetch reward balance" });
  }
};
export const getPortfolio = async (req, res) => {
  try {
    const userAddress = req.params.user;
    if (!userAddress) return res.status(400).json({ error: "Missing address" });

    const lendingVault = getContract("LendingVault");
    const loanManager = getContract("LoanManager");
    const rewardsContract = getContract("Reward");

    const [supplied, borrowed, rewards] = await Promise.all([
      lendingVault.getUserSupply(userAddress),
      loanManager.getBorrowedAmount(userAddress),
      rewardsContract.getRewardBalance(userAddress),
    ]);

    res.status(200).json({
      user: userAddress,
      supplied: ethers.utils.formatEther(supplied),
      borrowed: ethers.utils.formatEther(borrowed),
      rewards: ethers.utils.formatEther(rewards),
    });
  } catch (err) {
    console.error("Portfolio fetch error:", err);
    res.status(500).json({ error: "Failed to fetch portfolio" });
  }
};

export const borrowTokens = async (req, res) => {
  try {
    const {
      userAddress,
      borrowToken,
      amount,
      collateralToken,
      collateralAmount,
    } = req.body;
    if (
      !userAddress ||
      !borrowToken ||
      !amount ||
      !collateralToken ||
      !collateralAmount
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (Number(collateralAmount) <= 0) {
      return res
        .status(400)
        .json({ error: "Collateral must be greater than 0" });
    }

    const loanManager = getContract("LoanManager");
    const parsedAmount = ethers.utils.parseEther(amount.toString());
    const parsedCollateral = ethers.utils.parseEther(
      collateralAmount.toString()
    );

    const tx = await loanManager.borrow(
      borrowToken,
      parsedAmount,
      collateralToken,
      parsedCollateral,
      { from: userAddress }
    );
    await tx.wait();

    res
      .status(200)
      .json({ message: "Loan borrowed successfully", txHash: tx.hash });
  } catch (err) {
    console.error("Borrow error:", err);
    res.status(500).json({ error: "Borrowing failed" });
  }
};
export const stakeTokens = async (req, res) => {
  try {
    const { userAddress, amount } = req.body;
    if (!userAddress || !amount)
      return res.status(400).json({ error: "Missing fields" });

    const stakingContract = getContract("Staking");
    const parsedAmount = ethers.utils.parseEther(amount.toString());

    const tx = await stakingContract.stake(parsedAmount, { from: userAddress });
    await tx.wait();

    res.status(200).json({ message: "Staked successfully", txHash: tx.hash });
  } catch (err) {
    console.error("Stake error:", err);
    res.status(500).json({ error: "Stake failed" });
  }
};

export const unstakeTokens = async (req, res) => {
  try {
    const { userAddress, amount } = req.body;
    if (!userAddress || !amount)
      return res.status(400).json({ error: "Missing fields" });

    const stakingContract = getContract("Staking");
    const parsedAmount = ethers.utils.parseEther(amount.toString());

    const tx = await stakingContract.unstake(parsedAmount, {
      from: userAddress,
    });
    await tx.wait();

    res.status(200).json({ message: "Unstaked successfully", txHash: tx.hash });
  } catch (err) {
    console.error("Unstake error:", err);
    res.status(500).json({ error: "Unstake failed" });
  }
};
