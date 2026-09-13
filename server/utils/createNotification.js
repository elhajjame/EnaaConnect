import Notification from "../models/NotificationModel.js";

const createNotification = async (io, notificationData) => {
  const notification = await Notification.create({
    recipient: notificationData.recipient,
    actor: notificationData.actor || null,
    type: notificationData.type,
    message: notificationData.message,
    relatedEntityType: notificationData.relatedEntityType,
    relatedEntity: notificationData.relatedEntity,
  });

  await notification.populate({
    phat: "actor",
    select: "fullName profilePicture",
  });

  const recipientRoom = `user:${notification.recipient.toString()}`;

  if (io) {
    io.to(recipientRoom).emit("newNotification", notification);
  }
};
