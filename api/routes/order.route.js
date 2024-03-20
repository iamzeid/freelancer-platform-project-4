import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { getOrders, intent, confirm, getAllOrders, completeOrder } from "../controllers/order.controller.js";
import Order from "../models/order.model.js";

const router = express.Router();

// router.post("/:gigId", verifyToken, createOrder);
router.get("/", verifyToken, getOrders);
router.post("/create-payment-intent/:id", verifyToken, intent);
router.put("/", verifyToken, confirm);
router.get("/completed/count", async (req, res) => {
  // Update route to match the mounting point in index.js
  try {
    const count = await Order.countDocuments({ isCompleted: true });
    res.json({ count });
  } catch (error) {
    console.error("Error retrieving completed orders count:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/allOrders", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});
router.put('/:id/complete', completeOrder);

export default router;
