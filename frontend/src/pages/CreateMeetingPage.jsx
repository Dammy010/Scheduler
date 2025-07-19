import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function CreateMeetingPage() {
  const [title, setTitle] = useState("");
  const [datetime, setDatetime] = useState("");
  const [location, setLocation] = useState("");
  const [participants, setParticipants] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const validateEmails = (emails) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emails.every((email) => emailRegex.test(email));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const participantArray = participants
      .split(",")
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    if (participantArray.length === 0) {
      setError("Please enter at least one participant.");
      return;
    }

    if (!validateEmails(participantArray)) {
      setError("One or more participant emails are invalid.");
      return;
    }

    if (!location.trim()) {
      setError("Location is required.");
      return;
    }

    try {
      const res = await api.post("/meetings", {
        title,
        datetime,
        location,
        participants: participantArray,
      });

      console.log("Meeting created:", res.data);
      navigate("/upcoming-meetings");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create meeting.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-xl mx-auto bg-white shadow rounded-xl p-6">
          <h1 className="text-2xl font-bold mb-6">Create a New Meeting</h1>

          {error && <p className="text-red-600 mb-4 text-sm">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Meeting Title</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded"
                placeholder="Enter meeting title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Date & Time</label>
              <input
                type="datetime-local"
                className="w-full px-4 py-2 border rounded"
                value={datetime}
                onChange={(e) => setDatetime(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Location</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Participants (emails)
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded"
                placeholder="e.g. user1@example.com, user2@example.com"
                value={participants}
                onChange={(e) => setParticipants(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">
                Separate multiple emails with commas.
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Create Meeting
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
