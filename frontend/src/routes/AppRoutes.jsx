import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import LandingPage from "../pages/LandingPage";
import DashboardPage from "../pages/DashboardPage";
import CreateMeetingPage from "../pages/CreateMeetingPage";
import UpcomingMeetingsPage from "../pages/UpcomingMeetingsPage";
import EditMeetingPage from "../pages/EditMeetingPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import AboutPage from "../pages/AboutPage";
import NotFoundPage from "../pages/NotFoundPage";

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  console.log("PrivateRoute: user =", user, "loading =", loading);
  if (loading) return <div className="p-4 text-center">Loading...</div>;
  return user ? children : <Navigate to="/login" />;
}


const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<SignupPage />} />

    <Route
      path="/dashboard"
      element={
        <PrivateRoute>
          <DashboardPage />
        </PrivateRoute>
      }
    />
    <Route
      path="/create-meeting"
      element={
        <PrivateRoute>
          <CreateMeetingPage />
        </PrivateRoute>
      }
    />
    <Route
      path="/upcoming-meetings"
      element={
        <PrivateRoute>
          <UpcomingMeetingsPage />
        </PrivateRoute>
      }
    />
    <Route
      path="/edit-meeting/:id"
      element={
        <PrivateRoute>
          <EditMeetingPage />
        </PrivateRoute>
      }
    />
    
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AppRoutes;
