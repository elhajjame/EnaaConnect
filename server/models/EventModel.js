import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
      minlength: [3, "Event title must contain at least 3 characters"],
      maxlength: [100, "Event title cannot exceed 100 characters"],
    },

    description: {
      type: String,
      required: [true, "Event description is required"],
      trim: true,
      minlength: [10, "Event description must contain at least 10 characters"],
      maxlength: [2000, "Event description cannot exceed 2000 characters"],
    },

    date: {
      type: Date,
      required: [true, "Event date is required"],
    },

    time: {
      type: String,
      required: [true, "Event time is required"],
      match: [/^([01]\d|2[0-3]):[0-5]\d$/, "Event time must use HH:mm format"],
    },

    location: {
      type: String,
      required: [true, "Event location is required"],
      trim: true,
      minlength: [2, "Event location must contain at least 2 characters"],
      maxlength: [200, "Event location cannot exceed 200 characters"],
    },

    category: {
      type: String,
      required: [true, "Event category is required"],
      enum: {
        values: [
          "education",
          "sports",
          "workshops",
          "culture",
          "entertainment",
          "trips",
        ],
        message: "Invalid event category",
      },
    },

    maximumParticipants: {
      type: Number,
      required: [true, "Maximum participants is required"],
      min: [1, "Maximum participants must be at least 1"],
      max: [1000, "Maximum participants cannot exceed 1000"],
    },

    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Event organizer is required"],
    },

    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

const Event = mongoose.model("Event", eventSchema);

export default Event;
