import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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

  const createCourse = async () => {
    await axios.post(
      "https://elearning-backend-sdhd.onrender.com/api/courses",
      { title, description },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setTitle("");
    setDescription("");
    fetchCourses();
  };

  const deleteCourse = async (id) => {
    await axios.delete(
      `https://elearning-backend-sdhd.onrender.com/api/courses/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    fetchCourses();
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div>
      <h2>Manage Courses</h2>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={createCourse}>Add Course</button>

      <ul>
        {courses.map((c) => (
          <li key={c._id}>
            {c.title} - {c.description}
            <button onClick={() => deleteCourse(c._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageCourses;
