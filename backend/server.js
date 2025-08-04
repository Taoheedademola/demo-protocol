// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import supplyRoutes from "./routes/supplyRoutes.js";
import loanRoutes from "./routes/loanRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import rewardRoutes from "./routes/rewardRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/supply", supplyRoutes);
app.use("/api/loan", loanRoutes);
app.use("/api/user", userRoutes);
app.use("/api/rewards", rewardRoutes);

app.get("/", (req, res) => res.send("Demo Protocol Backend Running 🚀"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
