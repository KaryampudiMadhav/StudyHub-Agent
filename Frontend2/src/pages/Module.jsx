import React, { useState, useEffect } from "react";
// We need these hooks to get the URL parameter and to navigate
import { useParams, useNavigate, Link } from "react-router-dom";
import Header2 from "./../components/Header2"; // Assuming this path is correct
import { ChevronLeft, ChevronRight, Link as LinkIcon } from "lucide-react"; // Simpler icons

const ModulePage = () => {
  const [skillResult, setSkillResult] = useState(null);
  const navigate = useNavigate();
  const { index } = useParams();

  const currentIndex = parseInt(index, 10) || 0;

  useEffect(() => {
    const stored = localStorage.getItem("user-skill");
    if (stored) {
      const parsedData = JSON.parse(stored);
     
      if (parsedData && parsedData.steps) {
        setSkillResult(parsedData);
      }
    }

  }, []);

  if (!skillResult) {
    return <div>Loading...</div>;
  }

  const currentStep = skillResult.steps[currentIndex];
  const totalSteps = skillResult.steps.length;

  const handleNext = () => {
    if (currentIndex < totalSteps - 1) {
      navigate(`/modules/${currentIndex + 1}`);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      navigate(`/modules/:${currentIndex - 1}`);
    }
  };

  const handleQuiz = async()=>{
      navigate(`/quiz/${currentIndex}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header2 />
      <div className="container mx-auto p-4 md:p-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="md:w-1/3 lg:w-1/4 bg-white p-6 rounded-2xl shadow-lg h-fit">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              {skillResult.skill}
            </h2>
            <nav className="space-y-2">
              {skillResult.steps.map((step, index) => (
                <Link
                  key={index}
                  to={`/modules/${index}`}
                  className={`w-full text-left flex items-center p-3 rounded-lg ${
                    currentIndex === index
                      ? "bg-indigo-100 text-indigo-700 font-bold"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <span className="mr-3">{index + 1}</span>
                  <span className="truncate">{step.step}</span>
                </Link>
              ))}
            </nav>
          </aside>

          <main className="flex-1">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {currentStep.step}
              </h1>
              <p className="text-gray-600 text-base leading-relaxed mb-8">
                {currentStep.description}
              </p>

              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Resources
                </h2>
                <div className="space-y-3">
                  {currentStep.resources.map((url, idx) => (
                    <a
                      key={idx}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center p-3 bg-gray-100 hover:bg-gray-200 rounded-lg"
                    >
                      <LinkIcon className="h-5 w-5 mr-3 text-gray-500" />
                      <span className="text-blue-600 underline truncate">
                        {url}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="pt-6 flex justify-between items-center border-t">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="px-6 py-2 rounded-lg font-semibold text-gray-700 bg-gray-200 disabled:opacity-50"
                >
                  Previous
                </button>
                  <button className="px-6 py-2 rounded-lg font-semibold text-gray-700 bg-gray-200 disabled:opacity-50" onClick={handleQuiz} >
                    Quiz
                  </button>
                <button
                  onClick={handleNext}
                  className="px-6 py-2 rounded-lg font-semibold text-white bg-indigo-600"
                >
                  {currentIndex < totalSteps - 1 ? "Next" : "Quiz"}
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ModulePage;
