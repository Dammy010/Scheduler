const Meeting = require("../models/Meeting");
const User = require("../models/User");

// @desc    Create a new meeting
// @route   POST /api/meetings
// @access  Private
const createMeeting = async (req, res) => {
  const { title, datetime, participants, location } = req.body;

  try {
    if (!title || !datetime || !location) {
      return res.status(400).json({ message: "Title, datetime, and location are required." });
    }

    if (!participants?.length) {
      return res.status(400).json({ message: "At least one participant email is required." });
    }

    const users = await User.find({ email: { $in: participants } });

    if (users.length !== participants.length) {
      return res.status(400).json({ message: "Some participant emails are invalid." });
    }

    const participantObjects = users.map(user => ({
      user: user._id,
      status: "pending"
    }));

    const meeting = await Meeting.create({
      creator: req.user._id,
      title,
      datetime,
      location,
      participants: participantObjects
    });

    res.status(201).json(meeting);
  } catch (error) {
    console.error("[CREATE_MEETING_ERROR]:", error);
    res.status(500).json({ message: "Server error creating meeting." });
  }
};

// @desc    Respond to a meeting (accept/decline)
// @route   PATCH /api/meetings/:id/respond
// @access  Private
const respondToMeeting = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const meeting = await Meeting.findById(id);
    if (!meeting) return res.status(404).json({ message: "Meeting not found." });

    const participant = meeting.participants.find(p =>
      p.user.toString() === req.user._id.toString()
    );

    if (!participant) {
      return res.status(403).json({ message: "You are not a participant of this meeting." });
    }

    participant.status = status;
    await meeting.save();

    res.json(meeting);
  } catch (error) {
    console.error("[RESPOND_MEETING_ERROR]:", error);
    res.status(500).json({ message: "Server error responding to meeting." });
  }
};

// @desc    Get all upcoming meetings for a user
// @route   GET /api/meetings/upcoming
// @access  Private
const getUpcomingMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find({
      $or: [
        { creator: req.user._id },
        { "participants.user": req.user._id }
      ],
      datetime: { $gte: new Date() }
    })
      .populate("creator", "name email")
      .populate("participants.user", "name email")
      .sort("datetime");

    res.json(meetings);
  } catch (error) {
    console.error("[GET_MEETINGS_ERROR]:", error);
    res.status(500).json({ message: "Server error fetching meetings." });
  }
};

// @desc    Cancel a meeting
// @route   DELETE /api/meetings/:id
// @access  Private (creator only)
const cancelMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id);
    if (!meeting) return res.status(404).json({ message: "Meeting not found." });

    if (meeting.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to cancel this meeting." });
    }

    await Meeting.deleteOne({ _id: req.params.id });

    res.json({ message: "Meeting canceled successfully." });
  } catch (error) {
    console.error("[CANCEL_MEETING_ERROR]:", error);
    res.status(500).json({ message: "Server error canceling meeting." });
  }
};

// @desc    Update a meeting
// @route   PUT /api/meetings/:id
// @access  Private (creator only)
const updateMeeting = async (req, res) => {
  const { title, datetime, participants, location } = req.body;

  try {
    const meeting = await Meeting.findById(req.params.id);
    if (!meeting) return res.status(404).json({ message: "Meeting not found." });

    if (meeting.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this meeting." });
    }

    if (title) meeting.title = title;
    if (datetime) meeting.datetime = datetime;
    if (location) meeting.location = location;

    if (participants?.length) {
      const users = await User.find({ email: { $in: participants } });

      if (users.length !== participants.length) {
        return res.status(400).json({ message: "Some participant emails are invalid." });
      }

      meeting.participants = users.map(user => ({
        user: user._id,
        status: "pending"
      }));
    }

    await meeting.save();
    res.json(meeting);
  } catch (error) {
    console.error("[UPDATE_MEETING_ERROR]:", error);
    res.status(500).json({ message: "Server error updating meeting." });
  }
};

const getMeetingById = async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id)
      .populate("creator", "name email")
      .populate("participants.user", "name email");

    if (!meeting) {
      return res.status(404).json({ message: "Meeting not found." });
    }

    res.json(meeting);
  } catch (error) {
    console.error("Get Meeting Error:", error);
    res.status(500).json({ message: "Server error." });
  }
};


module.exports = {
  createMeeting,
  respondToMeeting,
  getUpcomingMeetings,
  cancelMeeting,
  updateMeeting,
  getMeetingById,
};
