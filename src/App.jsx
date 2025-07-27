import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Subjects from "./pages/Subjects";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Questions from "./pages/Questions";
import AdminDashboard from "./pages/AdminDashboard";

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) return <Navigate to="/login" />;
  if (requiredRole && user?.role !== requiredRole) return <Navigate to="/" />;

  return children;
};

export default function App() {
  const location = useLocation();
  const token = localStorage.getItem("token");

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
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}
