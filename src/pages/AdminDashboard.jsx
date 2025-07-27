import React, { useEffect, useState } from "react";
import ManageCourses from "./ManageCourses";
import ManageQuizzes from "./ManageQuizzes";
import ManageQuestions from "./ManageQuestions";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("courses");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.role === "admin") {
      setIsAdmin(true);
    } else {
      window.location.href = "/login"; // redirect non-admins
    }
  }, []);

  if (!isAdmin) return null;

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div>
        <button onClick={() => setActiveTab("courses")}>Courses</button>
        <button onClick={() => setActiveTab("quizzes")}>Quizzes</button>
        <button onClick={() => setActiveTab("questions")}>Questions</button>
      </div>

      <div>
        {activeTab === "courses" && <ManageCourses />}
        {activeTab === "quizzes" && <ManageQuizzes />}
        {activeTab === "questions" && <ManageQuestions />}
      </div>
    </div>
  );
};

export default AdminDashboard;
