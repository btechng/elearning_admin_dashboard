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
  const token = localStorage.getItem("token"); // ✅ Check login status
  const showSidebar = Boolean(token); // ✅ Only show sidebar if logged in

  return (
    <div className="flex">
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
