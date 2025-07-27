// src/pages/Signup.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://elearning-backend-sdhd.onrender.com/api/auth/register",
        {
          email,
          password,
          role: "user", // 👈 regular user by default
        }
      );
      navigate("/login");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">User Signup</h2>
      <form onSubmit={handleSignup} className="space-y-4">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
