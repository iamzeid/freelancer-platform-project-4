import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import axios from "axios";
import bcrypt from "bcrypt";
import { sendVerificationEmail } from "./emailService.js";

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "ITI", {
    expiresIn: maxAge,
  });
};

const handleErrors = (err) => {
  let errors = { email: "", password: "", username: "", role: "" };

  console.log(err);
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }
  if (err.message === "Passwords do not match") {
    // Add condition for passwords not matching
    errors.password = "Passwords do not match";
  }





  if (err.code === 11000) {
    if (err.keyPattern.email) {
      errors.email = "Email is already registered";
    } else if (err.keyPattern.username) {
      errors.username = "Username is already taken";
    }
    return errors;
  }

  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// Route handler function to get verification status
export const getVerificationStatus = async (req, res) => {
  try {
    // Retrieve the user ID from the request
    const userId = req.user.id;

    // Find the user in the database
    const user = await User.findById(userId);

    // Check if the user is verified
    const isVerified = user ? user.verified : false;

    // Send the verification status as response
    res.status(200).json({ isVerified });
  } catch (error) {
    console.error("Error getting verification status:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const register = async (req, res) => {
  if (req.body.googleAccessToken) {
    const { googleAccessToken } = req.body;

    axios
      .get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${googleAccessToken}`,
        },
      })
      .then(async (response) => {
        const { email, username } = req.body;
        const firstName = response.data.given_name;
        const lastName = response.data.family_name;
        const picture = response.data.picture;

        const existingUser = await User.findOne({
          $or: [{ email }, { username }],
        });

        if (existingUser) {
          if (existingUser.email === email) {
            return res
              .status(400)
              .json({ message: "Email is already registered" });
          }
          if (existingUser.username === username) {
            return res
              .status(400)
              .json({ message: "Username is already taken" });
          }
        }

        const result = await User.create({
          verified: "true",
          email,
          username,
          firstName,
          lastName,
          profilePicture: picture,
        });

        const token = createToken(result._id);

        res.status(200).json({ result, token });
      })
      .catch((err) => {
        res.status(400).json({ message: "Invalid access token!" });
      });
  } else {
    try {
      const { email, password, retypePassword, username, role, picture, bio } =
        req.body;

      // Check if passwords match
      if (password !== retypePassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }

      // Hash the password
      // const hashedPassword = await bcrypt.hash(password, 10);

      // Generate verification token
      const verificationToken = jwt.sign({ email }, "verification_secret", {
        expiresIn: "1d",
      });

      // Save user data with verification token
      const user = await User.create({
        email,
        password,
        username,
        role,
        profilePicture: picture,
        verificationToken, // Save the verification token to the user document
      });

      // Send email verification
      await sendVerificationEmail(email, verificationToken);

      // Respond with success and redirection URL
      return res.status(201).json({
        message: "User registered successfully",
        redirectTo: "/verification",
      });
    } catch (err) {
      console.log(err);
      const errors = handleErrors(err);
      res.json({ errors, created: false });
    }
  }
};

export const verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    // Decode the token to get the email
    const { email } = jwt.verify(token, "verification_secret");

    // Find the user by email and update the verification status
    const user = await User.findOneAndUpdate(
      { email, verificationToken: token },
      { $set: { verified: true } },
      { new: true }
    );

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found or invalid token" });
    }

    // Redirect to the home page after successful verification
    res.redirect("/");
  } catch (err) {
    console.error("Error verifying email:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  if (req.body.googleAccessToken) {
    const { googleAccessToken } = req.body;

    axios
      .get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${googleAccessToken}`,
        },
      })
      .then(async (response) => {
        const { email } = req.body;
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
          return res.status(404).json({ message: "User does not exist!" });
        }

        const token = createToken(existingUser._id);

        res.status(200).json({ result: existingUser, token });
      })
      .catch((err) => {
        res.status(400).json({ message: "Invalid access token!" });
      });
  } else {
    const { email, password } = req.body;
    try {
      const user = await User.login(email, password);
      if (!user) {
        return res.status(401).json({ message: "Incorrect email or password" });
      }
      const token = createToken(user._id);
      res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
      res.status(200).json({ user: user._id, status: true });
    } catch (err) {
      // res.status(500).json({ message: "Internal Server Error" });
      const errors = handleErrors(err);
      res.json({ errors, status: false });
    }
  }
};

export const logout = (req, res) => {
  // Your logout logic here
};
