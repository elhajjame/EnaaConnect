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

export const reviewEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);

    if (!event) {
      return errorResponse(res, 404, "Event not found");
    }

    if (event.status !== "pending") {
      return errorResponse(res, 409, "Only pending events can be reviewed");
    }

    event.status = req.body.status;
    event.reviewedBy = req.user._id;
    event.reviewedAt = new Date();

    await event.save();

    const eventData = {
      id: event._id,
      title: event.title,
      status: event.status,
      organizer: event.organizer,
      reviewedBy: event.reviewedBy,
      reviewedAt: event.reviewedAt,
      updatedAt: event.updatedAt,
    };

    const message =
      event.status === "approved"
        ? "Event approved successfully"
        : "Event rejected successfully";

    return successResponse(res, 200, eventData, message);
  } catch (error) {
    return handleControllerError(res, error);
  }
};

export const getApprovedEvents = async (req, res) => {
  try {
    const events = await Event.find({ status: "approved" })
      .sort({ date: 1, time: 1 })
      .populate("organizer", "fullName profilePicture fieldOfStudy");

    const eventData = events.map((event) => {
      return {
        id: event._id,
        title: event.title,
        description: event.description,
        date: event.date.toISOString().slice(0, 10),
        time: event.time,
        location: event.location,
        category: event.category,
        maximumParticipants: event.maximumParticipants,
        participantsCount: event.participants.length,
        status: event.status,
        organizer: event.organizer
          ? {
              id: event.organizer._id,
              fullName: event.organizer.fullName,
              profilePicture: event.organizer.profilePicture,
              fieldOfStudy: event.organizer.fieldOfStudy,
            }
          : null,
        createdAt: event.createdAt,
      };
    });

    return successResponse(
      res,
      200,
      eventData,
      "Approved events retrieved successfully",
    );
  } catch (error) {
    return handleControllerError(res, error);
  }
};

export const joinEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);

    if (!event) {
      return errorResponse(res, 404, "Event not found");
    }

    let alreadyJoined = false;

    for (const participantId of event.participants) {
      if (participantId.equals(req.user._id)) {
        alreadyJoined = true;
        break;
      }
    }

    if (alreadyJoined) {
      return errorResponse(res, 409, "You have already joined this event");
    }

    if (event.participants.length >= event.maximumParticipants) {
      return errorResponse(res, 409, "Event has reached its maximum capacity");
    }

    event.participants.push(req.user._id);
    await event.save();

    const participantsCount = event.participants.length;
    const placesLeft = event.maximumParticipants - participantsCount;

    const eventData = {
      eventId: event._id,
      joined: true,
      participantsCount,
      maximumParticipants: event.maximumParticipants,
      placesLeft,
      isFull: placesLeft === 0,
    };

    return successResponse(res, 200, eventData, "Event joined successfully");
  } catch (error) {
    return handleControllerError(res, error);
  }
};

export const leaveEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);

    if (!event) {
      return errorResponse(res, 404, "Event not found");
    }

    let participantIndex = -1;
    console.log("this id", req.user._id);
    for (let index = 0; index < event.participants.length; index++) {
      const participantId = event.participants[index];

      if (participantId.equals(req.user._id)) {
        participantIndex = index;
        break;
      }
    }
    console.log("index", participantIndex);
    if (participantIndex === -1) {
      return errorResponse(res, 409, "You have not joined this event");
    }

    event.participants.splice(participantIndex, 1);
    await event.save();

    const participantsCount = event.participants.length;
    const placesLeft = event.maximumParticipants - participantsCount;

    const eventData = {
      eventId: event._id,
      joined: false,
      participantsCount,
      maximumParticipants: event.maximumParticipants,
      placesLeft,
      isFull: placesLeft === 0,
    };

    return successResponse(res, 200, eventData, "Event left successfully");
  } catch (error) {
    return handleControllerError(res, error);
  }
};
