import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageQuestions = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [quizId, setQuizId] = useState("");
  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  const token = localStorage.getItem("token");

  const fetchQuizzes = async () => {
    const res = await axios.get(
      "https://elearning-backend-sdhd.onrender.com/api/quizzes",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setQuizzes(res.data);
  };

  const fetchQuestions = async () => {
    const res = await axios.get(
      `https://elearning-backend-sdhd.onrender.com/api/questions?quizId=${quizId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setQuestions(res.data);
  };

  const createQuestion = async () => {
    await axios.post(
      "https://elearning-backend-sdhd.onrender.com/api/questions",
      {
        quizId,
        questionText,
        options,
        correctAnswer,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setQuestionText("");
    setOptions(["", "", "", ""]);
    setCorrectAnswer("");
    fetchQuestions();
  };

  const deleteQuestion = async (id) => {
    await axios.delete(
      `https://elearning-backend-sdhd.onrender.com/api/questions/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    fetchQuestions();
  };

  useEffect(() => {
    fetchQuizzes();
    if (quizId) fetchQuestions();
  }, [quizId]);

  return (
    <div>
      <h2>Manage Questions</h2>
      <select value={quizId} onChange={(e) => setQuizId(e.target.value)}>
        <option value="">Select Quiz</option>
        {quizzes.map((q) => (
          <option key={q._id} value={q._id}>
            {q.title}
          </option>
        ))}
      </select>

      <input
        placeholder="Question"
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
      />
      {options.map((opt, i) => (
        <input
          key={i}
          placeholder={`Option ${i + 1}`}
          value={opt}
          onChange={(e) => {
            const newOptions = [...options];
            newOptions[i] = e.target.value;
            setOptions(newOptions);
          }}
        />
      ))}
      <input
        placeholder="Correct Answer"
        value={correctAnswer}
        onChange={(e) => setCorrectAnswer(e.target.value)}
      />
      <button onClick={createQuestion}>Add Question</button>

      <ul>
        {questions.map((q) => (
          <li key={q._id}>
            {q.questionText}
            <button onClick={() => deleteQuestion(q._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageQuestions;
