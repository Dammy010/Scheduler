import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

export default function EditMeetingPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [meeting, setMeeting] = useState(null);
  const [title, setTitle] = useState("");
  const [datetime, setDatetime] = useState("");
  const [location, setLocation] = useState("");
  const [participants, setParticipants] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelLoading, setCancelLoading] = useState(false);

  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        const res = await api.get(`/api/meetings/${id}`);
        const data = res.data;

        setMeeting(data);
        setTitle(data.title || "");
        setDatetime(data.datetime?.slice(0, 16) || "");
        setLocation(data.location || "");
        const emailList = data.participants?.map(p => p?.user?.email).filter(Boolean).join(", ") || "";
        setParticipants(emailList);
      } catch (err) {
        console.error("Error loading meeting", err);
        setError("Failed to load meeting.");
      } finally {
        setLoading(false);
      }
    };

    fetchMeeting();
  }, [id]);

  const validateEmails = (emails) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emails.every((email) => emailRegex.test(email));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const participantArray = participants
      .split(",")
      .map((email) => email.trim())
      .filter(Boolean);

    if (participantArray.length === 0) {
      return setError("Please enter at least one participant email.");
    }

    if (!validateEmails(participantArray)) {
      return setError("One or more participant emails are invalid.");
    }

    try {
      await api.put(`/api/meetings/${id}`, {
        title,
        datetime,
        location,
        participants: participantArray,
      });
      navigate("/upcoming-meetings");
    } catch (err) {
      console.error("Update failed", err);
      setError(err.response?.data?.message || "Failed to update meeting.");
    }
  };

  const handleCancel = async () => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this meeting?");
    if (!confirmCancel) return;

    try {
      setCancelLoading(true);
      await api.delete(`/api/meetings/${id}`);
      navigate("/upcoming-meetings");
    } catch (err) {
      console.error("Cancel failed", err);
      setError("Failed to cancel meeting.");
    } finally {
      setCancelLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-10 text-gray-600">Loading meeting...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white shadow rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Edit Meeting</h1>

        {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Meeting Title</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Date & Time</label>
            <input
              type="datetime-local"
              className="w-full px-4 py-2 border rounded"
              value={datetime}
              onChange={(e) => setDatetime(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Location</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Optional location"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Participants (emails)</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded"
              placeholder="e.g. john@example.com, jane@example.com"
              value={participants}
              onChange={(e) => setParticipants(e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">Separate emails with commas</p>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Update Meeting
            </button>

            <button
              type="button"
              onClick={handleCancel}
              disabled={cancelLoading}
              className={`w-full py-2 rounded ${
                cancelLoading
                  ? "bg-red-300 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              } text-white`}
            >
              {cancelLoading ? "Cancelling..." : "Cancel Meeting"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
