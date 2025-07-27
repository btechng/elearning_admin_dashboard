import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "https://elearning-backend-sdhd.onrender.com/api/subject";

export default function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });

  const fetchSubjects = async () => {
    const res = await axios.get(API);
    setSubjects(res.data);
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name) return;
    await axios.post(API, form);
    setForm({ name: "", description: "" });
    fetchSubjects();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchSubjects();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Subjects</h2>

      <div className="mb-6">
        <input
          type="text"
          name="name"
          placeholder="Subject name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 mr-2"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2"
        >
          Add Subject
        </button>
      </div>

      <ul className="space-y-2">
        {subjects.map((subj) => (
          <li key={subj._id} className="flex justify-between items-center border p-2">
            <div>
              <h3 className="font-semibold">{subj.name}</h3>
              <p className="text-sm">{subj.description}</p>
            </div>
            <button
              onClick={() => handleDelete(subj._id)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
