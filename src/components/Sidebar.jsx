import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Sidebar() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    toast.success("Logged out successfully", {
      position: "top-center",
      autoClose: 1500,
    });
    setTimeout(() => {
      window.location.href = "/login";
    }, 1500);
  };

  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-4">Panel</h2>
      <ul className="space-y-4">
        {/* <li>
          <Link to="/" className="block hover:text-gray-300">
            Subjects
          </Link>
        </li> */}
        <li>
          <Link to="/questions" className="block hover:text-gray-300">
            View Questions
          </Link>
        </li>
      </ul>

      <button
        onClick={handleLogout}
        className="mt-8 block text-red-400 hover:text-red-600"
      >
        Logout
      </button>
    </div>
  );
}
