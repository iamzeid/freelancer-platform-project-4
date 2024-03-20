import mongoose from "mongoose";
const { Schema } = mongoose;
import User from "./user.model.js";

const ReviewSchema = new Schema(
  {
    gigId: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId, // Reference to the User model
      ref: 'User', // Name of the referenced model
      required: true,
    },
    star: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4, 5],
    },
    desc: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Review", ReviewSchema);
