import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [title, setTitle] = useState("");
  const [courseId, setCourseId] = useState("");
  const [courses, setCourses] = useState([]);

  const token = localStorage.getItem("token");

  const fetchCourses = async () => {
    const res = await axios.get(
      "https://elearning-backend-sdhd.onrender.com/api/courses",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setCourses(res.data);
  };

  const fetchQuizzes = async () => {
    const res = await axios.get(
      "https://elearning-backend-sdhd.onrender.com/api/quizzes",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setQuizzes(res.data);
  };

  const createQuiz = async () => {
    await axios.post(
      "https://elearning-backend-sdhd.onrender.com/api/quizzes",
      { title, courseId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setTitle("");
    setCourseId("");
    fetchQuizzes();
  };

  useEffect(() => {
    fetchCourses();
    fetchQuizzes();
  }, []);

  return (
    <div>
      <h2>Manage Quizzes</h2>
      <select value={courseId} onChange={(e) => setCourseId(e.target.value)}>
        <option value="">Select Course</option>
        {courses.map((c) => (
          <option key={c._id} value={c._id}>
            {c.title}
          </option>
        ))}
      </select>
      <input
        placeholder="Quiz Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={createQuiz}>Add Quiz</button>

      <ul>
        {quizzes.map((q) => (
          <li key={q._id}>
            {q.title} — Course: {q.courseId}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageQuizzes;
