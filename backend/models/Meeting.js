const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "declined"],
    default: "pending",
  },
});

const meetingSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    datetime: {
      type: Date,
      required: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    participants: {
      type: [participantSchema],
      validate: {
        validator: (value) => Array.isArray(value) && value.length > 0,
        message: "At least one participant is required",
      },
    },

    canceled: {
      type: Boolean,
      default: false,
    },

    meetingStatus: {
      type: String,
      enum: ["active", "completed", "canceled"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Meeting", meetingSchema);
