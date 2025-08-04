// backend/routes/supplyRoutes.js

import express from "express";
import { supplyTokens, withdrawTokens } from "../controllers/loanController.js";

const router = express.Router();

// Supply DEMO tokens
router.post("/deposit", supplyTokens);

// Withdraw supplied DEMO tokens
router.post("/withdraw", withdrawTokens);

export default router;
