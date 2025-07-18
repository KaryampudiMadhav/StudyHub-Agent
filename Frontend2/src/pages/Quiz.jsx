import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, ChevronRight, RotateCw } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom"; 

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [quizData, setQuizData] = useState(null); 
  const [skill,setSkill] = useState("")
  const { index } = useParams();
  const naviagte = useNavigate()
  useEffect(() => {
    const quiz = JSON.parse(localStorage.getItem("user-skill"));
    setSkill(quiz.skill)
    if (quiz?.steps?.[index]) {
      setQuizData(quiz.steps[index].quiz);
    }
     console.log(quiz.steps[index].quiz);
  }, [index]);

  const handleNavigate = ()=>{
    naviagte(`/modules/${index+1}`)
  }

  if (!quizData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-bold text-gray-700">
        Loading Quiz...
      </div>
    );
  }

  const totalQuestions = quizData.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleOptionClick = (option) => {
    if (isAnswered) return;

    setSelectedAnswer(option);
    setIsAnswered(true);

    if (option === quizData[currentQuestion].answer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setShowResults(false);
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Quiz Completed!
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            You've reached the end of the quiz.
          </p>
          <div className="bg-indigo-100 rounded-lg p-6 mb-8">
            <p className="text-xl text-indigo-800">Your Final Score:</p>
            <p className="text-5xl font-bold text-indigo-600 my-2">
              {score} / {totalQuestions}
            </p>
          </div>
          <button
            onClick={handleRestart}
            className="flex items-center justify-center w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <RotateCw className="mr-2 h-5 w-5" />
            Restart Quiz
          </button>
        </div>
      </div>
    );
  }

  const current = quizData[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            {skill} Skills Quiz
          </h1>
          <p className="text-gray-500 mt-2">
            Test your knowledge of {skill} fundamentals.
          </p>
        </header>
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">
                Question {currentQuestion + 1}
                <span className="text-sm font-normal opacity-75">
                  /{totalQuestions}
                </span>
              </h2>
              <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-white/30 rounded-full h-2.5">
              <div
                className="bg-white h-2.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="p-8">
            <h3 className="font-bold text-2xl text-gray-800 mb-6">
              {current.question}
            </h3>
            <div className="space-y-4">
              {current.options.map((opt) => {
                const isCorrect = opt === current.answer;
                const isSelected = opt === selectedAnswer;

                let optionClass =
                  "border-gray-300 hover:border-indigo-500 hover:bg-indigo-50";
                if (isAnswered) {
                  if (isSelected) {
                    optionClass = isCorrect
                      ? "border-green-500 bg-green-100"
                      : "border-red-500 bg-red-100";
                  } else if (isCorrect) {
                    optionClass = "border-green-500 bg-green-100/50";
                  }
                }

                return (
                  <div
                    key={opt}
                    onClick={() => handleOptionClick(opt)}
                    className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 ${optionClass}`}
                  >
                    <span className="font-semibold text-gray-700">{opt}</span>
                    {isAnswered &&
                      isSelected &&
                      (isCorrect ? (
                        <CheckCircle className="text-green-600" />
                      ) : (
                        <XCircle className="text-red-600" />
                      ))}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end p-6 bg-gray-50 border-t border-gray-200">
            {isAnswered && (
              <button
                onClick={handleNext}
                className="flex items-center bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {currentQuestion === totalQuestions - 1
                  ? "Finish"
                  : "Next Question"}
                <ChevronRight className="ml-2 h-5 w-5" />
              </button>
            )}
            {currentQuestion === totalQuestions - 1 && (
              <button
                onClick={() => handleNavigate}
                className="flex items-center bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                NextModule
                <ChevronRight className="ml-2 h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
