// src/pages/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "https://elearning-backend-sdhd.onrender.com/api/auth/login",
        form
      );
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow rounded w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="border w-full p-2 mb-3"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="border w-full p-2 mb-4"
        />
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white w-full py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}
