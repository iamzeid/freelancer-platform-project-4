import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is Required"],
      unique: true, // Ensure uniqueness of usernames
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
      unique: true, // Ensure uniqueness of emails
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
    },
    img: {
      type: String,
      required: false,
      default: "/img/anon.png",
    },
    country: {
      type: String,
      required: false,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    desc: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    education: {
      type: String,
      required: false,
    },
    experience: {
      type: String,
      required: false,
    },
    skills: {
      type: String,
      required: false,
    },
    isSeller: {
      type: Boolean,
      default: false,
    },
    certificate: {
      type: String,
      required: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verificationToken: String,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

export default mongoose.model("User", userSchema);
