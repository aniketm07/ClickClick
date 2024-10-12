import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import CreatePost from "./pages/CreatePost";
import Profile from "./pages/Profile";
import Error404 from "./pages/Error404";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/auth/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Accessible Routes */}
          <Route path="/" element={<Landing />} />
          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<Dashboard />} />}
          />
          <Route
            path="/create"
            element={<ProtectedRoute element={<CreatePost />} />}
          />
          <Route
            path="/profile"
            element={<ProtectedRoute element={<Profile />} />}
          />
          {/* All other routes */}
          <Route path="*" element={<Error404 />} />
          <Route path="/error" element={<Error404 />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
