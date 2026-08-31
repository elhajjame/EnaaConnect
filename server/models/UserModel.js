import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";
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
      required: [true, "Please confirm your password"],
      minlength: 8,
      select: false,
      validate: {
        validator: function (el) {
          return el === this.password;
        },
      },
    },
    passwordResetToken: { type: String },
    passwordResetExpires: { type: Date },
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
    passwordChangedAt: Date,
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password") || this.isNew) return;
  this.passwordChangedAt = Date.now() - 2000;
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  this.password = await bcrypt.hash(this.password, 15);
  this.confirmPassword = undefined;
});

userSchema.methods.comparePassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 1 * 60 * 60 * 1000;
  return resetToken;
};
const User = mongoose.model("User", userSchema);
export default User;
