import Event from "../models/EventModel.js";
import { errorResponse, successResponse } from "../responses/response.js";
import handleControllerError from "../utils/handleControllerError.js";

export const createEvent = async (req, res) => {
  try {
    const event = await Event.create({
      title: req.body.title,
      description: req.body.description,
      date: new Date(`${req.body.date}T00:00:00.000Z`),
      time: req.body.time,
      location: req.body.location,
      category: req.body.category,
      maximumParticipants: req.body.maximumParticipants,
      organizer: req.user._id,
      participants: [],
      status: "pending",
    });

    const eventData = {
      id: event._id,
      title: event.title,
      description: event.description,
      date: event.date.toISOString().slice(0, 10),
      time: event.time,
      location: event.location,
      category: event.category,
      maximumParticipants: event.maximumParticipants,
      participants: [],
      status: "pending",
      organizer: {
        id: req.user._id,
        fullName: req.user.fullName,
        profilePicture: req.user.profilePicture,
      },
      createdAt: event.createdAt,
    };

    return successResponse(res, 201, eventData, "Event submitted for approval");
  } catch (error) {
    return handleControllerError(res, error);
  }
};
