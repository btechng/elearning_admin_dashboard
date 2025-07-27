import React from "react";
import { toast } from "react-toastify";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
      <ul className="space-y-2">
        <li>
          <a href="/" className="block hover:text-gray-300">
            Subjects
          </a>
        </li>
      </ul>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          toast.success("Logged out successfully", {
            position: "top-center",
            autoClose: 1500,
          });
          setTimeout(() => {
            window.location.href = "/login";
          }, 1500);
        }}
        className="mt-8 block text-red-400 hover:text-red-600"
      >
        Logout
      </button>
    </div>
  );
}
