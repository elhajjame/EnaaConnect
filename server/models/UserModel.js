 import mongoose from "mongoose";
  import bcrypt from "bcryptjs";
  import crypto from "crypto";

  const enaaEmailPattern = /^[a-zA-Z0-9._%+-]+@enaa\.ma$/i;

  const userSchema = new mongoose.Schema(
    {
      fullName: {
        type: String,
        required: [true, "Full name is required"],
        trim: true,
        minlength: [3, "Full name must contain at least 3 characters"],
      },

      email: {
        type: String,
        required: [true, "ENAA email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [
          enaaEmailPattern,
          "Registration requires a valid @enaa.ma email address",
        ],
      },

      password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must contain at least 8 characters"],
        select: false,
      },

      confirmPassword: {
        type: String,
        required: [true, "Please confirm your password"],
        select: false,
        validate: {
          validator: function (value) {
            return value === this.password;
          },
          message: "Passwords do not match",
        },
      },

      role: {
        type: String,
        enum: ["student", "admin"],
        default: "student",
      },
      

      isVerified: {
        type: Boolean,
        default: false,
      },

      fieldOfStudy: {
        type: String,
        trim: true,
        default: "",
      },

      academicYear: {
        type: String,
        trim: true,
        default: "",
      },

      profilePicture: {
        type: String,
        default: "",
      },

      biography: {
        type: String,
        trim: true,
        maxlength: [500, "Biography cannot exceed 500 characters"],
        default: "",
      },

      interests: [
        {
          type: String,
          trim: true,
        },
      ],

      verificationToken: {
        type: String,
        select: false,
      },

      verificationTokenExpires: {
        type: Date,
        select: false,
      },

      passwordResetToken: {
        type: String,
        select: false,
      },

      passwordResetExpires: {
        type: Date,
        select: false,
      },

      passwordChangedAt: Date,
    },
    {
      timestamps: true,
    },
  );

  userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
      return;
    }

    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
  });

  userSchema.pre("save", function () {
    if (!this.isModified("password") || this.isNew) {
      return;
    }

    this.passwordChangedAt = Date.now() - 1000;
  });

  userSchema.methods.comparePassword = async function (
    candidatePassword,
    storedPassword,
  ) {
    return bcrypt.compare(candidatePassword, storedPassword);
  };

  userSchema.methods.changedPasswordAfter = function (jwtIssuedAt) {
    if (!this.passwordChangedAt) {
      return false;
    }

    const passwordChangedTimestamp = Math.floor(
      this.passwordChangedAt.getTime() / 1000,
    );

    return passwordChangedTimestamp > jwtIssuedAt;
  };

  userSchema.methods.createEmailVerificationToken = function () {
    const verificationToken = crypto.randomBytes(32).toString("hex");

    this.verificationToken = crypto
      .createHash("sha256")
      .update(verificationToken)
      .digest("hex");

    this.verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000;

    return verificationToken;
  };

  userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex");

    this.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    this.passwordResetExpires = Date.now() + 60 * 60 * 1000;

    return resetToken;
  };

  const User = mongoose.model("User", userSchema);

  export default User;