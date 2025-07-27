import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "https://elearning-backend-sdhd.onrender.com/api/subject";

export default function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });
  const [editId, setEditId] = useState(null);

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

    if (editId) {
      await axios.put(`${API}/${editId}`, form);
      setEditId(null);
    } else {
      await axios.post(API, form);
    }

    setForm({ name: "", description: "" });
    fetchSubjects();
  };

  const handleEdit = (subject) => {
    setForm({ name: subject.name, description: subject.description });
    setEditId(subject._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchSubjects();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Subjects</h2>

      <div className="flex flex-col md:flex-row gap-2 mb-6">
        <input
          type="text"
          name="name"
          placeholder="Subject name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 flex-1"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 flex-1"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2"
        >
          {editId ? "Update" : "Add"}
        </button>
      </div>

      <ul className="space-y-2">
        {subjects.map((subj) => (
          <li
            key={subj._id}
            className="flex flex-col md:flex-row justify-between items-start md:items-center border p-2"
          >
            <div>
              <h3 className="font-semibold">{subj.name}</h3>
              <p className="text-sm">{subj.description}</p>
            </div>
            <div className="mt-2 md:mt-0 space-x-3">
              <button
                onClick={() => handleEdit(subj)}
                className="text-green-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(subj._id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
