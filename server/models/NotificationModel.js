import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Notification recipient is required"],
    },

    actor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    type: {
      type: String,
      required: [true, "Notification type is required"],
      enum: {
        values: [
          "post_like",
          "post_comment",
          "event_comment",
          "event_join",
          "club_join",
          "new_message",
          "club_announcement",
          "event_approved",
          "event_rejected",
        ],
        message: "Invalid notification type",
      },
    },

    message: {
      type: String,
      required: [true, "Notification message is required"],
      trim: true,
      minlength: [1, "Notification message cannot be empty"],
      maxlength: [300, "Notification message cannot exceed 300 characters"],
    },

    relatedEntityType: {
      type: String,
      required: [true, "Related entity type is required"],
      enum: {
        values: [
          "post",
          "comment",
          "event",
          "event_comment",
          "club",
          "message",
          "announcement",
        ],
        message: "Invalid related entity type",
      },
    },

    relatedEntity: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Related entity ID is required"],
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

notificationSchema.index({
  recipient: 1,
  createdAt: -1,
});

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
