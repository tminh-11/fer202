import React, { useReducer, useEffect } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const initialState = {
  questions: [
    {
      id: 1,
      question: "What is the capital of Australia?",
      options: ["Sydney", "Canberra", "Melbourne", "Perth"],
      answer: "Canberra",
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      id: 3,
      question: "What is the largest ocean on Earth?",
      options: [
        "Atlantic Ocean",
        "Indian Ocean",
        "Pacific Ocean",
        "Arctic Ocean",
      ],
      answer: "Pacific Ocean",
    },
  ],
  currentQuestion: 0,
  selectedOption: "",
  score: 0,
  showScore: false,
  feedback: "",
  timeLeft: 10,
  highScore: Number(localStorage.getItem("highScore")) || 0,
};

function quizReducer(state, action) {
  switch (action.type) {
    case "SELECT_OPTION": {
      const isCorrect =
        action.payload === state.questions[state.currentQuestion].answer;
      return {
        ...state,
        selectedOption: action.payload,
        feedback: isCorrect
          ? "correct"
          : `incorrect|${state.questions[state.currentQuestion].answer}`,
      };
    }

    case "NEXT_QUESTION": {
      const isCorrect =
        state.selectedOption === state.questions[state.currentQuestion].answer;
      const updatedScore = isCorrect ? state.score + 1 : state.score;
      const isLastQuestion =
        state.currentQuestion + 1 === state.questions.length;

      if (isLastQuestion) {
        const newHighScore =
          updatedScore > state.highScore ? updatedScore : state.highScore;
        localStorage.setItem("highScore", newHighScore);
        return {
          ...state,
          score: updatedScore,
          showScore: true,
          highScore: newHighScore,
        };
      }

      return {
        ...state,
        score: updatedScore,
        currentQuestion: state.currentQuestion + 1,
        selectedOption: "",
        feedback: "",
        timeLeft: 10,
      };
    }

    case "TICK":
      return { ...state, timeLeft: state.timeLeft - 1 };

    case "TIME_UP":
      return {
        ...state,
        feedback: `incorrect|${state.questions[state.currentQuestion].answer}`,
      };

    case "RESTART_QUIZ":
      return {
        ...initialState,
        highScore: Number(localStorage.getItem("highScore")) || 0,
      };

    default:
      return state;
  }
}

export default function QuestionBank() {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const {
    questions,
    currentQuestion,
    selectedOption,
    score,
    showScore,
    feedback,
    timeLeft,
    highScore,
  } = state;

  // 🕒 Timer logic
  useEffect(() => {
    if (showScore) return;
    if (timeLeft <= 0 && !feedback) {
      dispatch({ type: "TIME_UP" });
      return;
    }
    const timer = setTimeout(() => dispatch({ type: "TICK" }), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, feedback, showScore]);

  const handleOptionSelect = (option) => {
    if (!feedback) dispatch({ type: "SELECT_OPTION", payload: option });
  };

  const handleNextQuestion = () => dispatch({ type: "NEXT_QUESTION" });
  const handleRestartQuiz = () => dispatch({ type: "RESTART_QUIZ" });

  // 🎯 Feedback message
  const renderFeedback = () => {
    if (feedback === "correct") {
      return (
        <p style={{ color: "green", fontWeight: "bold", marginTop: 10 }}>
          <FaCheckCircle /> Correct! 🎉
        </p>
      );
    } else if (feedback.startsWith("incorrect")) {
      const correctAns = feedback.split("|")[1];
      return (
        <p style={{ color: "red", fontWeight: "bold", marginTop: 10 }}>
          <FaTimesCircle /> Incorrect! The correct answer is{" "}
          <strong>{correctAns}</strong>.
        </p>
      );
    }
    return null;
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: 20,
        padding: 20,
        backgroundColor: "#f8f9fa",
        borderRadius: 10,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ color: "#007bff", marginBottom: 20 }}>🧠 Question Bank</h2>

      {showScore ? (
        <div>
          <h3>
            Your Score: {score} / {questions.length}
          </h3>
          <h4 style={{ color: "#ffc107" }}>🏆 High Score: {highScore}</h4>
          <button
            className="btn btn-primary mt-3"
            onClick={handleRestartQuiz}
          >
            Restart Quiz
          </button>
        </div>
      ) : (
        <div>
          {/* 📊 Progress */}
          <h5>
            Question {currentQuestion + 1}/{questions.length}
          </h5>

          {/* ❓ Question */}
          <h4 style={{ marginTop: 15 }}>{questions[currentQuestion].question}</h4>

          {/* 🔘 Options */}
          <div style={{ marginTop: 10 }}>
            {questions[currentQuestion].options.map((option, i) => (
              <button
                key={i}
                onClick={() => handleOptionSelect(option)}
                className="btn btn-outline-primary m-2"
                style={{
                  minWidth: 200,
                  backgroundColor:
                    selectedOption === option
                      ? "#d1e7dd"
                      : feedback && option === questions[currentQuestion].answer
                      ? "#a8dadc"
                      : "",
                  cursor: feedback ? "not-allowed" : "pointer",
                }}
                disabled={!!feedback}
              >
                {option}
              </button>
            ))}
          </div>

          {/* 🟩 Feedback */}
          {renderFeedback()}

          {/* ⏱️ Countdown */}
          <p
            style={{
              color: timeLeft <= 5 ? "red" : "#333",
              fontWeight: "bold",
              fontSize: "18px",
              marginTop: 10,
            }}
          >
            ⏰ Time left: {timeLeft}s
          </p>

          {/* 👉 Next button */}
          <button
            className="btn btn-success mt-3"
            disabled={!feedback}
            onClick={handleNextQuestion}
          >
            {currentQuestion === questions.length - 1
              ? "Finish Quiz"
              : "Next Question"}
          </button>
        </div>
      )}
    </div>
  );
}
