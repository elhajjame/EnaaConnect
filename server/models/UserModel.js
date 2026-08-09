import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
    confirmPassword: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
    profilePicture: {
      type: String,
      default: "",
    },

    biography: {
      type: String,
      default: "",
      maxlength: 500,
    },

    fieldOfStudy: {
      type: String,
      default: "",
    },

    class: {
      type: String,
      default: "",
    },

    interests: [
      {
        type: String,
      },
    ],

    role: {
      type: String,
      enum: ["student", "BDE"],
      default: "student",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    verificationToken: {
      type: String,
      default: null,
    },

    resetPasswordToken: {
      type: String,
      default: null,
    },

    resetPasswordExpires: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next;
  }
  this.password = await bcrypt.hash(this.password, 15);
  this.confirmPassword = undefined
});

userSchema.methods.comparePassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

export default mongoose.model("User", userSchema);
