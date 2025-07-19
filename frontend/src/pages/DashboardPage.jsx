import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  const { user } = useAuth();
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const res = await api.get("/api/meetings/upcoming");
        const data = res.data;

        if (Array.isArray(data)) {
          setMeetings(data);
        } else {
          console.warn("Expected meetings to be an array but got:", data);
          setMeetings([]);
        }
      } catch (err) {
        console.error("Failed to load meetings", err);
        setMeetings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMeetings();
  }, []);

  const createdCount = Array.isArray(meetings)
    ? meetings.filter((meeting) => {
        const creatorId = meeting.creator?._id || meeting.creator;
        return user?._id && creatorId?.toString() === user._id.toString();
      }).length
    : 0;

  const participantCount = Array.isArray(meetings)
    ? meetings.filter((meeting) => {
        const creatorId = meeting.creator?._id || meeting.creator;
        return (
          user?._id &&
          creatorId?.toString() !== user._id.toString() &&
          meeting.participants?.some((p) => {
            const participantId = p?.user?._id || p?.user;
            return participantId?.toString() === user._id.toString();
          })
        );
      }).length
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6">Welcome to your Dashboard</h1>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <Link
            to="/create-meeting"
            className="p-6 bg-white rounded-xl shadow hover:bg-blue-50"
          >
            <h2 className="text-xl font-semibold mb-2">➕ Create New Meeting</h2>
            <p>Schedule a new meeting with participants.</p>
          </Link>

          <Link
            to="/upcoming-meetings"
            className="p-6 bg-white rounded-xl shadow hover:bg-blue-50"
          >
            <h2 className="text-xl font-semibold mb-2">📅 Upcoming Meetings</h2>
            <p>View meetings you've created or are invited to.</p>

            <div className="mt-4 space-y-1 text-sm">
              {loading ? (
                <p className="text-gray-500">Loading meeting stats...</p>
              ) : (
                <>
                  <p>
                    You created:{" "}
                    <span className="font-bold text-blue-600">{createdCount}</span>
                  </p>
                  <p>
                    You're invited to:{" "}
                    <span className="font-bold text-green-600">
                      {participantCount}
                    </span>
                  </p>
                </>
              )}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
