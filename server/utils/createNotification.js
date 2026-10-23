import Notification from "../models/NotificationModel.js";

export const createNotification = async (io, notificationData) => {
  const actorId = notificationData.actor?.toString();
  const recipientId = notificationData.recipient.toString();

  if (actorId === recipientId) {
    return null;
  }

  const notification = await Notification.create({
    recipient: notificationData.recipient,
    actor: notificationData.actor || null,
    type: notificationData.type,
    message: notificationData.message,
    relatedEntityType: notificationData.relatedEntityType,
    relatedEntity: notificationData.relatedEntity,
  });

  await notification.populate({
    path: "actor",
    select: "fullName profilePicture",
  });

  if (io) {
    const recipientRoom = `user:${notification.recipient.toString()}`;
    io.to(recipientRoom).emit("newNotification", notification);
  }

  return notification;
};
