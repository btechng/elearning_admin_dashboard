import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Subjects from "./pages/Subjects";

export default function App() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <Routes>
          <Route path="/" element={<Subjects />} />
        </Routes>
      </div>
    </div>
  );
}
