import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { MeetingProvider } from "./context/MeetingContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <MeetingProvider>
          <AppRoutes />
        </MeetingProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
