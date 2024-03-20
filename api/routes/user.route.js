import express from "express";
import { deleteUser, editUser, getUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";
import User from "../models/user.model.js";

const router = express.Router();

router.delete("/:id", verifyToken, deleteUser);
router.get("/:id", getUser);
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});
router.post("/:id", verifyToken, editUser);

export default router;
