import React from "react";
import Header2 from "../components/Header2";

const resources = [
  {
    module: "MODULE 1",
    type: "video",
    level: "Beginner",
    title: "React Setup Tutorial - YouTube",
    description: "Set up a basic React project using Create React App",
    time: "45 min",
  },
  {
    module: "MODULE 1",
    type: "documentation",
    level: "Beginner",
    title: "Create React App Documentation",
    description: "Set up a basic React project using Create React App",
    time: "30 min",
  },
  {
    module: "MODULE 1",
    type: "documentation",
    level: "Intermediate",
    title: "React Official Getting Started Guide",
    description: "Set up a basic React project using Create React App",
    time: "60 min",
  },
  {
    module: "MODULE 2",
    type: "video",
    level: "Intermediate",
    title: "Components & JSX Deep Dive",
    description: "Understand Components and JSX",
    time: "90 min",
  },
  {
    module: "MODULE 2",
    type: "documentation",
    level: "Intermediate",
    title: "React Components Documentation",
    description: "Understand Components and JSX",
    time: "45 min",
  },
  {
    module: "MODULE 2",
    type: "documentation",
    level: "Advanced",
    title: "JSX In-Depth Guide",
    description: "Understand Components and JSX",
    time: "60 min",
  },
];

export default function Resource() {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      {/* ✅ Use header directly without extra wrapping */}
      <header className="top-0 h-10 w-full">
        <Header2 />
      </header>

      {/* Page Title */}
      <section className="text-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 text-3xl mb-4 shadow">
          📖
        </div>
        <h1 className="text-4xl font-extrabold mb-2">Learning Resources</h1>
        <p className="text-gray-500 max-w-lg mx-auto">
          Curated collection of high-quality resources to accelerate your React
          learning journey
        </p>
      </section>

      {/* Filters */}
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
          Showing {resources.length} of {resources.length} resources
        </div>
      </section>

      {/* Resource Cards */}
      <section className="px-6 pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((res, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-md p-5 flex flex-col justify-between transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:-translate-y-1"
          >
            <div>
              <div className="text-xs text-gray-500 flex justify-between">
                <span>
                  {res.module} · {res.type}
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    res.level === "Beginner"
                      ? "bg-green-100 text-green-700"
                      : res.level === "Intermediate"
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
              <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1 rounded-full shadow hover:shadow-md hover:brightness-110 text-sm transition">
                Open Resource
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
