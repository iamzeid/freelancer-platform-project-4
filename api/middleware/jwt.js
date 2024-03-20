import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";
import User from "../models/user.model.js";

export const requireVerification = async (req, res, next) => {
  try {
    // Assuming you have a 'user' property attached to the request object after authentication
    const user = req.user;
    // Check if the user is verified
    if (!user.verified) {
      return res.status(403).json({ message: "Account not verified" });
    }
    // If the user is verified, proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error in verification middleware:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(req.cookies, req.cookies.jwt, token);
  if (!token) return next(createError(401, "You are not authenticated!"));

  jwt.verify(token, "ITI", async (err, payload) => {
    if (err) {
      return next(createError(403, "Token is not valid!"));
    }
    req.userId = payload.id;
    req.isSeller = payload.isSeller;
    next();
  });
};

export const checkUser = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "ITI", async (err, decodedToken) => {
      if (err) {
        res.json({ status: false });
        next();
      } else {
        try {
          const user = await User.findById(decodedToken.id);
          if (user) res.json({ status: true, user: user.email });
          else res.json({ status: false });
          next();
        } catch (error) {
          console.error(error);
          res
            .status(500)
            .json({ status: false, message: "Internal server error." });
        }
      }
    });
  } else {
    res.json({ status: false });
    next();
  }
};
