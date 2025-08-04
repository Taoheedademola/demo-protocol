// backend/routes/rewardRoutes.js

import express from "express";
import {
  claimRewards,
  getRewardBalance,
} from "../controllers/loanController.js";

const router = express.Router();

router.post("/claim", claimRewards);
router.get("/:user", getRewardBalance);

export default router;
