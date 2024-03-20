dotenv.config();

import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/user.route.js";
import gigRoute from "./routes/gig.route.js";
import orderRoute from "./routes/order.route.js";
import conversationRoute from "./routes/conversation.route.js";
import messageRoute from "./routes/message.route.js";
import reviewRoute from "./routes/review.route.js";
import authRoute from "./routes/auth.route.js";
import authRoutes from "./routes/AuthRoutes.js";

import passportStrategy from "./passport.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import passport from "passport";
import cors from "cors";
import bodyParser from "body-parser";

import paypal from "paypal-rest-sdk";

import session from "express-session";

const app = express();

// Configure express-session middleware
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(bodyParser.json());

mongoose.set("strictQuery", true);

// Set up PayPal SDK with your credentials
paypal.configure({
  mode: "sandbox", // Change to 'live' for production
  client_id:
    "AcJap_lPHfmdVP_cmommdfUNHHnM9Xd_1puXTOkUEX3GWMPYhnvUBCNU5BBHiP8720_nBGjALm03b2kU",
  client_secret:
    "EMpkUx8M-QgFzctaiArNW9moKpBr3Nyq_39LPiEFK6dhsSPKIo6XvUdUfKQ37Oh1OmUPJ-TlyUGFVf0k",
});

mongoose.set("strictQuery", true);

app.post("/create-payment", async (req, res) => {
  const { gigId, title, price, sellerId, buyerId, payment_intent } = req.body;

  try {
    // Set up payment details for PayPal
    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: title,
                sku: "item",
                price: price,
                currency: "USD",
                quantity: 1,
              },
            ],
          },
          amount: {
            currency: "USD",
            total: price,
          },
          description: title,
        },
      ],
      redirect_urls: {
        return_url: "http://localhost:3000/success", // Replace with your success URL
        cancel_url: "http://localhost:3000/cancel", // Replace with your cancel URL
      },
    };

    // Create a PayPal payment
    paypal.payment.create(create_payment_json, async function (error, payment) {
      if (error) {
        console.error('Error creating PayPal payment:', error);
        return res.status(500).json({ error: 'Error creating PayPal payment' });
      } else {
        try {
          // Save the order details to the database
          const newOrder = new orderModel({
            gigId,
            title,
            price,
            sellerId,
            buyerId,
            payment_intent,
          });
          await newOrder.save();
        } catch (error) {
          console.error('Error saving order to database:', error);
          return res.status(500).json({ error: 'Error saving order to database' });
        }

        // Redirect to PayPal for user approval
        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel === 'approval_url') {
            return res.json({ approval_url: payment.links[i].href });
          }
        }
        return res.status(500).json({ error: 'Approval URL not found in PayPal response' });
      }
    });
  } catch (error) {
    console.error("Error creating PayPal payment:", error);
    return res.status(500).json({ error: "Error creating PayPal payment" });
  }
});

const MONGO_ATLAS_URI =
  "mongodb+srv://iamzeid98:AIXA27GZ7tovgt3A@cluster0.yqjdbg7.mongodb.net/fiverr?retryWrites=true&w=majority&appName=Cluster0";

// const MONGO_ATLAS_URI = "mongodb://localhost:27017/fiverr";

const ORIGIN = "http://localhost:3000";
const PORT = 8800;

app.use(cors({ origin: ORIGIN, credentials: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(cookieParser());
// app.use("/api/auth", authRoute);

app.get('/api/user/orders/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const orders = await orderModel.find({ buyerId: userId });
    console.log(userId);
    res.json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ error: "Error fetching user orders" });
  }
});

app.use("/api/gigs", gigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/reviews", reviewRoute);
app.use("/", authRoutes);
app.use("/auth", authRoute);
app.use("/api/users", userRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
});

mongoose.connect(MONGO_ATLAS_URI, {
  useNewUrlParser: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
