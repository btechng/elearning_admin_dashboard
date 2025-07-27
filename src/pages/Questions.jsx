import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Questions() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    axios
      .get("https://elearning-backend-sdhd.onrender.com/api/questions")
      .then((res) => setQuestions(res.data))
      .catch((err) => console.error("Failed to fetch questions", err));
  }, []);

  const handleOptionChange = (questionId, selectedOption) => {
    setAnswers((prev) => ({ ...prev, [questionId]: selectedOption }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let correct = 0;
    questions.forEach((q) => {
      if (answers[q._id] === q.correctAnswer) {
        correct++;
      }
    });
    setScore(correct);
    setSubmitted(true);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Quiz Questions</h2>

      {questions.length === 0 ? (
        <p>Loading questions...</p>
      ) : submitted ? (
        <div>
          <p className="text-xl font-semibold mb-4">
            ✅ You scored {score} out of {questions.length}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {questions.map((q, index) => (
            <div key={q._id} className="border p-4 rounded shadow">
              <p className="font-semibold">
                {index + 1}. {q.questionText}
              </p>
              <div className="mt-2 space-y-1">
                {q.options.map((option, idx) => (
                  <label key={idx} className="block">
                    <input
                      type="radio"
                      name={`question-${q._id}`}
                      value={option}
                      checked={answers[q._id] === option}
                      onChange={() => handleOptionChange(q._id, option)}
                      className="mr-2"
                      required
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button
            type="submit"
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit Answers
          </button>
        </form>
      )}
    </div>
  );
}
