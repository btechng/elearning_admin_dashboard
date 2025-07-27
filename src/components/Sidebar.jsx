import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <nav className="space-y-4">
        <Link to="/" className="block hover:text-yellow-300">Subjects</Link>
      </nav>
    </div>
  );
}
