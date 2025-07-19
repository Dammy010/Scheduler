import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function UpcomingMeetingsPage() {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const res = await api.get("/meetings/upcoming");
        const upcoming = res.data.filter(
          (m) =>
            new Date(m.datetime) > new Date() &&
            m.meetingStatus !== "canceled"
        );
        setMeetings(upcoming);
      } catch (err) {
        console.error("Error fetching meetings", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMeetings();
  }, []);

  const handleResponse = async (id, status) => {
    try {
      await api.put(`/meetings/${id}/respond`, { status });
      setMeetings((prev) =>
        prev.map((m) =>
          m._id === id
            ? {
                ...m,
                participants: m.participants.map((p) =>
                  p.user._id === user._id ? { ...p, status } : p
                ),
              }
            : m
        )
      );
    } catch (err) {
      console.error("Error updating response", err);
    }
  };

  const handleCancel = async (id) => {
    try {
      await api.delete(`/api/meetings/${id}`);
      setMeetings((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      console.error("Cancel failed", err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-meeting/${id}`);
  };

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  if (loading)
    return <div className="text-center py-10">Loading meetings...</div>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-3xl mx-auto bg-white shadow rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Upcoming Meetings</h1>
            <button
              onClick={goToDashboard}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Back to Dashboard
            </button>
          </div>

          {meetings.length === 0 ? (
            <p>No upcoming meetings.</p>
          ) : (
            <ul className="space-y-4">
              {meetings.map((meeting) => {
                const isCreator = meeting.creator?._id === user?._id;
                const currentParticipant = meeting.participants.find(
                  (p) => p.user?._id === user?._id
                );
                const isParticipant = !!currentParticipant;
                const meetingIsCanceled =
                  meeting.canceled || meeting.meetingStatus === "canceled";

                return (
                  <li
                    key={meeting._id}
                    className={`border p-4 rounded-lg shadow-sm ${
                      meetingIsCanceled ? "bg-red-100" : "bg-gray-100"
                    }`}
                  >
                    <h2 className="text-lg font-semibold">{meeting.title}</h2>

                    {meeting.creator?.email && (
                      <p className="text-sm text-gray-700 mb-1">
                        ✉️ <span className="font-medium">Creator:</span>{" "}
                        {meeting.creator.email}
                      </p>
                    )}

                    <p className="text-sm">
                      📅 {new Date(meeting.datetime).toLocaleString()}
                    </p>

                    {meeting.location && (
                      <p className="text-sm mt-1">📍 {meeting.location}</p>
                    )}

                    <p className="text-sm mt-1">👥 Participants:</p>
                    <ul className="list-disc ml-6 text-sm">
                      {meeting.participants.map((p, idx) => (
                        <li key={idx}>
                          {p.user?.email || "Unknown"} —{" "}
                          <span className="italic text-gray-600">{p.status}</span>
                        </li>
                      ))}
                    </ul>

                    <p className="text-sm mt-1">
                      Meeting Status:{" "}
                      <span className="capitalize font-medium">
                        {meeting.meetingStatus || "active"}
                      </span>
                    </p>

                    {!meetingIsCanceled && (
                      <div className="flex gap-2 mt-3 flex-wrap">
                        {isCreator && (
                          <>
                            <button
                              onClick={() => handleEdit(meeting._id)}
                              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleCancel(meeting._id)}
                              className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
                            >
                              Cancel
                            </button>
                          </>
                        )}

                        {isParticipant &&
                          currentParticipant?.status === "pending" && (
                            <>
                              <button
                                onClick={() =>
                                  handleResponse(meeting._id, "accepted")
                                }
                                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() =>
                                  handleResponse(meeting._id, "declined")
                                }
                                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                              >
                                Decline
                              </button>
                            </>
                          )}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
