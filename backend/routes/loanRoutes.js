// backend/routes/loanRoutes.js
import express from "express";
import {
  borrowTokens,
  repayLoan,
  getPortfolio,
  claimRewards,
  getRewardBalance,
  createLoanOffer,
  acceptLoan,
  stakeTokens,
  unstakeTokens,
  supplyTokens,
  withdrawTokens,
} from "../controllers/loanController.js";

const router = express.Router();

// Vault
router.post("/supply", supplyTokens);
router.post("/withdraw", withdrawTokens);

// Loan
router.post("/borrow", borrowTokens);
router.post("/repay", repayLoan);
router.post("/loan/create", createLoanOffer);
router.post("/loan/accept", acceptLoan);

// Rewards
router.get("/rewards/:user", getRewardBalance);
router.post("/rewards/claim", claimRewards);

// Portfolio
router.get("/portfolio/:user", getPortfolio);

// Staking
router.post("/stake", stakeTokens);
router.post("/unstake", unstakeTokens);

export default router;
