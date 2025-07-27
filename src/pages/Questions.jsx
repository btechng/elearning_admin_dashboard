import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Questions() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios
      .get("https://elearning-backend-sdhd.onrender.com/api/questions")
      .then((res) => setQuestions(res.data))
      .catch((err) => console.error("Failed to fetch questions", err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Quiz Questions</h2>
      {questions.length === 0 ? (
        <p>No questions found.</p>
      ) : (
        <ul className="space-y-4">
          {questions.map((q, i) => (
            <li key={q._id} className="border rounded p-4 shadow">
              <p className="font-semibold">
                {i + 1}. {q.questionText}
              </p>
              <ul className="list-disc pl-5 mt-2">
                {q.options.map((opt, j) => (
                  <li key={j}>{opt}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
