import Notification from "../models/NotificationModel.js";
import { successResponse } from "../responses/response.js";
import handleControllerError from "../utils/handleControllerError.js";

export const getMyNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      recipient: req.user._id,
    })
      .sort({ createdAt: -1 })
      .populate("actor", "fullName profilePicture");

    const unreadCount = await Notification.countDocuments({
      recipient: req.user._id,
      isRead: false,
    });

    const notificationData = notifications.map((notification) => {
      return {
        id: notification._id,
        type: notification.type,
        message: notification.message,
        actor: notification.actor
          ? {
              id: notification.actor._id,
              fullName: notification.actor.fullName,
              profilePicture: notification.actor.profilePicture,
            }
          : null,
        relatedEntityType: notification.relatedEntityType,
        relatedEntity: notification.relatedEntity,
        isRead: notification.isRead,
        createdAt: notification.createdAt,
      };
    });

    return successResponse(
      res,
      200,
      {
        notifications: notificationData,
        unreadCount,
      },
      "Notifications retrieved successfully",
    );
  } catch (error) {
    return handleControllerError(res, error);
  }
};
