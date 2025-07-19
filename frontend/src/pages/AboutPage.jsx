import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <section className="py-20 px-6 bg-gradient-to-br from-blue-100 to-white text-center">
          <h1 className="text-4xl font-bold mb-4 text-blue-800">About Smart Meeting Scheduler</h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Smart Meeting Scheduler is a modern web application that helps individuals, teams, and organizations
            efficiently coordinate meetings without the hassle of endless back-and-forth emails. Whether you're scheduling
            a quick team sync or a formal client meeting, our tool makes the process seamless.
          </p>
        </section>

        <section className="py-12 px-6 bg-white text-center">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">What Problem Do We Solve?</h2>
          <div className="max-w-4xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-left">
            <div className="bg-blue-50 p-6 rounded-xl shadow">
              <h3 className="font-bold text-lg mb-2">🗓 Disorganized Scheduling</h3>
              <p className="text-gray-600 text-sm">
                No more endless messaging — propose a time, invite participants, and track responses in one place.
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl shadow">
              <h3 className="font-bold text-lg mb-2">📋 Lost Meeting Info</h3>
              <p className="text-gray-600 text-sm">
                View all your meetings — created or invited to with up-to-date details on who’s attending.
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl shadow">
              <h3 className="font-bold text-lg mb-2">❌ No RSVP Tracking</h3>
              <p className="text-gray-600 text-sm">
                See who has accepted, declined, or not yet responded, so you're never left guessing.
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl shadow">
              <h3 className="font-bold text-lg mb-2">⚙️ Hard to Update Meetings</h3>
              <p className="text-gray-600 text-sm">
                Easily edit or cancel meetings. All participants get instant updates.
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl shadow">
              <h3 className="font-bold text-lg mb-2">🧑‍🤝‍🧑 Designed for Everyone</h3>
              <p className="text-gray-600 text-sm">
                Built for small teams, freelancers, students, and communities no expensive software needed.
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl shadow">
              <h3 className="font-bold text-lg mb-2">🔔 Calendar-Ready & Future-Forward</h3>
              <p className="text-gray-600 text-sm">
                Designed for easy calendar sync, notifications, and third-party integrations.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 px-6 text-center bg-gradient-to-tr from-white to-blue-100">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Built With Purpose</h2>
          <p className="max-w-2xl mx-auto text-gray-700 text-lg">
            Smart Meeting Scheduler was created to streamline communication and improve productivity.
            It’s more than just a calendar tool it’s a smart assistant for your time.
          </p>
         
        </section>
      </main>
      <Footer />
    </div>
  );
}
