// services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // adjust if needed
});

// SUPPLY
export const deposit = (data) => API.post("/supply/deposit", data);
export const withdraw = (data) => API.post("/supply/withdraw", data);

// REWARDS
export const getRewards = (user) => API.get(`/rewards/${user}`);
export const claimRewards = () => API.post("/rewards/claim");

export default API;
