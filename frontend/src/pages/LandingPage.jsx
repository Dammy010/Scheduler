import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="text-center py-24 bg-gradient-to-br from-blue-100 to-blue-50">
          <h1 className="text-5xl font-bold mb-4 text-gray-800">
            Smart Meeting Scheduler
          </h1>
          <p className="text-lg mb-8 text-gray-600">
            Propose, accept, and manage meetings with calendar sync.
          </p>

          <Link
            to="/dashboard"
            className="inline-block px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
        </section>

        <section className="py-16 px-4 bg-white text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Key Features
          </h2>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            <li className="bg-blue-50 p-6 rounded-xl shadow hover:shadow-md transition">
              📅 <span className="font-semibold">Propose meetings easily</span>
              <br />
              Create and share meeting details with just a few clicks.
            </li>
            <li className="bg-blue-50 p-6 rounded-xl shadow hover:shadow-md transition">
              ✅{" "}
              <span className="font-semibold">Accept or decline requests</span>
              <br />
              Participants can respond in real time.
            </li>
            <li className="bg-blue-50 p-6 rounded-xl shadow hover:shadow-md transition">
              🔗 <span className="font-semibold">Calendar Integration</span>
              <br />
              Sync your meetings with Google Calendar or Outlook.
            </li>
          </ul>
        </section>

        <section className="py-16 px-4 bg-gray-50 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">
            How It Works
          </h2>
          <div className="max-w-4xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-4 text-left">
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
              <div className="text-3xl mb-2">1️⃣</div>
              <h3 className="font-semibold text-lg mb-1">Create a Meeting</h3>
              <p className="text-gray-600 text-sm">
                Enter title, time, and participant emails.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
              <div className="text-3xl mb-2">2️⃣</div>
              <h3 className="font-semibold text-lg mb-1">
                Invite Participants
              </h3>
              <p className="text-gray-600 text-sm">
                They’ll get notified and can respond instantly.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
              <div className="text-3xl mb-2">3️⃣</div>
              <h3 className="font-semibold text-lg mb-1">Track Responses</h3>
              <p className="text-gray-600 text-sm">
                See who’s attending and manage status updates.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
              <div className="text-3xl mb-2">4️⃣</div>
              <h3 className="font-semibold text-lg mb-1">Join or Reschedule</h3>
              <p className="text-gray-600 text-sm">
                Participants can join or reschedule easily.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
