import React, { useEffect, useState } from "react";
// Import the 'shallow' equality checker from Zustand
import { shallow } from "zustand/shallow";
import Header2 from "../components/Header2";
import { useAgentStore } from "../store/useAiStore";

export default function Resource() {
  // --- CORRECTED HOOK USAGE ---
  // The key change is adding the `shallow` function as the second argument.
  // This tells React to only re-render the component if the *values* of these
  // specific state properties have actually changed, which breaks the infinite loop.
  const { allSkills, loadingSkill, fetchAllSkills } = useAgentStore();

  const [resources, setResources] = useState([]);

  // 1. This effect correctly fetches data once on component mount.
  useEffect(() => {
    fetchAllSkills();
  }, [fetchAllSkills]);

  // 2. This effect correctly transforms the data when `allSkills` arrives.
  useEffect(() => {
    if (allSkills && Array.isArray(allSkills)) {
      const allResources = [];

      allSkills.forEach((skill) => {
        if (skill.steps && Array.isArray(skill.steps)) {
          skill.steps.forEach((step) => {
            if (step.resources && Array.isArray(step.resources)) {
              step.resources.forEach((link, index) => {
                allResources.push({
                  key: `${skill._id}-${step._id}-${index}`, // Use stable IDs for keys
                  module: skill.skill,
                  type: step.tags ? step.tags.join(", ") : "N/A",
                  level: skill.difficulty,
                  title: step.step,
                  description: `A resource for learning about ${step.step}.`,
                  time: step.estimatedTime,
                  link: link,
                });
              });
            }
          });
        }
      });
      setResources(allResources);
    }
  }, [allSkills]);

  // Display a loading message while fetching
  if (loadingSkill && !resources.length) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl font-semibold text-gray-600">
          Loading resources...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      <header className="top-0 h-10 w-full">
        <Header2 />
      </header>

      <section className="text-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 text-3xl mb-4 shadow">
          📖
        </div>
        <h1 className="text-4xl font-extrabold mb-2">Learning Resources</h1>
        <p className="text-gray-500 max-w-lg mx-auto">
          Curated collection of high-quality resources based on your selected
          skills
        </p>
      </section>

      <section className="flex flex-col md:flex-row md:justify-between items-center px-6 py-4 bg-white rounded-xl shadow mx-6 mb-8">
        <div className="flex space-x-4">
          <select className="border rounded px-3 py-2 focus:ring-2 focus:ring-indigo-300">
            <option>All Types</option>
          </select>
          <select className="border rounded px-3 py-2 focus:ring-2 focus:ring-indigo-300">
            <option>All Levels</option>
          </select>
        </div>
        <div className="text-sm text-gray-500 mt-2 md:mt-0">
          Showing {resources.length} resources
        </div>
      </section>

      <section className="px-6 pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((res) => (
          <div
            key={res.key}
            className="bg-white rounded-xl shadow-md p-5 flex flex-col justify-between transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:-translate-y-1"
          >
            <div>
              <div className="text-xs text-gray-500 flex justify-between">
                <span>
                  {res.module} · {res.type}
                </span>
                <span
                  className={`text-xs capitalize px-2 py-1 rounded-full ${
                    res.level.toLowerCase() === "beginner"
                      ? "bg-green-100 text-green-700"
                      : res.level.toLowerCase() === "intermediate"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {res.level}
                </span>
              </div>
              <h2 className="mt-3 font-bold text-lg text-indigo-800">
                {res.title}
              </h2>
              <p className="text-gray-600 text-sm mt-1">{res.description}</p>
            </div>
            <div className="flex justify-between items-center mt-6">
              <span className="text-gray-500 text-sm">⏱ {res.time}</span>
              <a
                href={res.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1 rounded-full shadow hover:shadow-md hover:brightness-110 text-sm transition"
              >
                Open Resource
              </a>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
