// backend/routes/loanRoutes.js
import express from "express";
import {
  borrow,
  repay,
  liquidate,
  checkUnpaidLoan,
  getInterest,
} from "../controllers/loanController.js";

const router = express.Router();

router.post("/borrow", borrow);
router.post("/repay", repay);
router.post("/liquidate", liquidate);
router.get("/unpaid/:user/:token", checkUnpaidLoan);
router.get("/interest/:user/:token", getInterest);

export default router;
