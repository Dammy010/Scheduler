const Meeting = require("../models/Meeting");
const User = require("../models/User");

const createMeeting = async (req, res) => {
  const { title, datetime, participants, location } = req.body;

  try {
    if (!title || !datetime || !location) {
      return res.status(400).json({ message: "Title, datetime, and location are required" });
    }

    if (!participants || !Array.isArray(participants) || participants.length === 0) {
      return res.status(400).json({ message: "At least one participant is required" });
    }

    const users = await User.find({ email: { $in: participants } });
    if (users.length === 0) {
      return res.status(400).json({ message: "No valid participant emails found" });
    }

    const participantObjects = users.map((user) => ({
      user: user._id,
      status: "pending",
    }));

    const meeting = await Meeting.create({
      creator: req.user._id,
      title,
      datetime,
      location,
      participants: participantObjects,
    });

    res.status(201).json(meeting);
  } catch (error) {
    console.error("Error creating meeting:", error);
    res.status(500).json({ message: "Server error creating meeting" });
  }
};

const respondToMeeting = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const meeting = await Meeting.findById(id);
    if (!meeting) return res.status(404).json({ message: "Meeting not found" });

    const participant = meeting.participants.find(
      (p) => p.user.toString() === req.user._id.toString()
    );
    if (!participant) {
      return res.status(403).json({ message: "You are not a participant of this meeting" });
    }

    participant.status = status;
    await meeting.save();

    res.json(meeting);
  } catch (error) {
    console.error("Error responding to meeting:", error);
    res.status(500).json({ message: "Server error responding to meeting" });
  }
};

const getUpcomingMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find({
      $or: [{ creator: req.user._id }, { "participants.user": req.user._id }],
      datetime: { $gte: new Date() },
    })
      .populate("creator", "name email")
      .populate("participants.user", "name email")
      .sort("datetime");

    res.json(meetings);
  } catch (error) {
    console.error("Error fetching meetings:", error);
    res.status(500).json({ message: "Server error fetching meetings" });
  }
};

const cancelMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id);
    if (!meeting) return res.status(404).json({ message: "Meeting not found" });

    if (meeting.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this meeting" });
    }

    await Meeting.findByIdAndDelete(req.params.id);
    res.json({ message: "Meeting deleted successfully" });
  } catch (error) {
    console.error("Error deleting meeting:", error);
    res.status(500).json({ message: "Server error deleting meeting" });
  }
};

const updateMeeting = async (req, res) => {
  const { title, datetime, participants, location } = req.body;

  try {
    const meeting = await Meeting.findById(req.params.id);
    if (!meeting) return res.status(404).json({ message: "Meeting not found" });

    if (meeting.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this meeting" });
    }

    if (title) meeting.title = title;
    if (datetime) meeting.datetime = datetime;
    if (location) meeting.location = location;

    if (participants && participants.length > 0) {
      const users = await User.find({ email: { $in: participants } });
      meeting.participants = users.map((user) => ({
        user: user._id,
        status: "pending",
      }));
    }

    await meeting.save();
    res.json(meeting);
  } catch (error) {
    console.error("Error updating meeting:", error);
    res.status(500).json({ message: "Server error updating meeting" });
  }
};

module.exports = {
  createMeeting,
  respondToMeeting,
  getUpcomingMeetings,
  cancelMeeting,
  updateMeeting,
};
