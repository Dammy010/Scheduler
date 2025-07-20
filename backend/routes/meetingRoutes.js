const express = require("express");
const {
  createMeeting,
  respondToMeeting,
  getUpcomingMeetings,
  cancelMeeting,
  updateMeeting,
  getMeetingById, // <-- Add this
} = require("../controllers/meetingController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createMeeting);

router.put("/:id/respond", protect, respondToMeeting);

router.get("/upcoming", protect, getUpcomingMeetings);

router.get("/:id", protect, getMeetingById);

router.put("/:id", protect, updateMeeting);

router.delete("/:id", protect, cancelMeeting);

module.exports = router;
