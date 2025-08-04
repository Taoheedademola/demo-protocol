import express from "express";
import { getPortfolio } from "../controllers/loanController.js";

const router = express.Router();

router.get("/:user", getPortfolio);

export default router;
