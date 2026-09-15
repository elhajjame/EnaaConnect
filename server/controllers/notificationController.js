import Notification from "../models/NotificationModel.js";
import { errorResponse, successResponse } from "../responses/response.js";
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

export const markNotificationAsRead = async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      {
        _id: req.params.notificationId,
        recipient: req.user._id,
      },
      {
        isRead: true,
      },
      { new: true },
    );

    if (!notification) {
      return errorResponse(res, 404, "Notification not found");
    }

    return successResponse(
      res,
      200,
      {
        id: notification._id,
        isRead: notification.isRead,
      },
      "Notification marked as read",
    );
  } catch (error) {
    return handleControllerError(res, error);
  }
};

export const markAllNotificationsAsRead = async (req, res) => {
  try {
    const result = await Notification.updateMany(
      { recipient: req.user._id, isRead: false },
      { $set: { isRead: true } },
    );

    return successResponse(
      res,
      200,
      {
        updatedCount: result.modifiedCount,
      },
      "All notifications marked as read",
    );
  } catch (error) {
    return handleControllerError(res, error);
  }
};
