import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Subjects from "./pages/Subjects";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Questions from "./pages/Questions";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

export default function App() {
  const location = useLocation();
  const token = localStorage.getItem("token");

  // Only hide sidebar on login and signup pages
  const hideSidebarRoutes = ["/login", "/signup"];
  const showSidebar = token && !hideSidebarRoutes.includes(location.pathname);

  return (
    <div className="flex min-h-screen">
      {showSidebar && <Sidebar />}
      <div className="flex-1 p-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/questions"
            element={
              <ProtectedRoute>
                <Questions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Subjects />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}
