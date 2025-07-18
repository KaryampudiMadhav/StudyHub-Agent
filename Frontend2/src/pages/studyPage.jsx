import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header2 from "../components/Header2";

const StudyPage = () => {
  const [skillResult, setSkillResult] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user-skill");
    if (stored) {
      setSkillResult(JSON.parse(stored));
    }
  }, []);

  const navigate = useNavigate()

  if (!skillResult) {
    return (
      <div className="text-center mt-20 text-gray-600">
        Loading skill data...
      </div>
    );
  }
  const handleQuiz = (index)=>{
    navigate(`/quiz/${index}`)
  }
  return (
    <div className="min-h-screen bg-[#e1eafc] font-sans p-6">
      <Header2 />
      <section className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-3">
          Master {skillResult.skill}
        </h2>
        <p className="text-gray-500 mb-6 max-w-xl mx-auto">
          Comprehensive learning path designed to take you from beginner to
          advanced {skillResult.skill}.
        </p>
        <div className="w-20 h-20 mx-auto border-4 border-gray-200 rounded-full flex items-center justify-center text-xl text-gray-600 font-semibold">
          0%
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <p className="text-sm text-gray-500 mb-2">Total Modules</p>
          <p className="text-2xl font-bold">{skillResult.steps.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <p className="text-sm text-gray-500 mb-2">Completed</p>
          <p className="text-2xl font-bold text-green-500">0</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <p className="text-sm text-gray-500 mb-2">Estimated Time</p>
          <p className="text-2xl font-bold text-purple-600">
            {skillResult.steps
              .map((s) => parseInt(s.estimatedTime))
              .reduce((a, b) => a + b, 0)}
            d
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <p className="text-sm text-gray-500 mb-2">Difficulty</p>
          <p className="text-2xl font-bold text-orange-600">
            {skillResult.difficulty.charAt(0).toUpperCase()}
            {skillResult.difficulty.slice(1, 3)}.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {skillResult.steps.map((item, index) => (
          <div key={index} className="bg-white rounded-xl shadow p-6">
            <div className="text-sm text-gray-500 mb-1">Module {index + 1}</div>
            <div className="text-xs text-gray-400 mb-2">
              {item.estimatedTime}
            </div>
            <h3 className="text-lg font-semibold mb-2">{item.step}</h3>
            <p className="text-gray-600 mb-4 text-sm">
              {item.description || "This module covers core concepts."}
            </p>

            <div className="flex flex-wrap gap-2 text-xs mb-4">
              {item.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <Link to={`/modules/:${index}`}>
              <button className="w-full py-2 mb-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold">
                ▶️ Start Learning
              </button>
            </Link>
              <button className="w-full text-sm text-gray-600 border rounded-lg py-2" onClick={() => handleQuiz(index)}>
                📝 Take Quiz
              </button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default StudyPage;
