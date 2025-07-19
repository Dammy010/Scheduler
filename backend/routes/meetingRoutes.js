const express = require("express");
const {
  createMeeting,
  respondToMeeting,
  getUpcomingMeetings,
  cancelMeeting,
  updateMeeting,
} = require("../controllers/meetingController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createMeeting);
router.put("/:id/respond", protect, respondToMeeting);
router.get("/upcoming", protect, getUpcomingMeetings);
router.delete("/:id", protect, cancelMeeting);
router.put("/:id", protect, updateMeeting);

module.exports = router;
