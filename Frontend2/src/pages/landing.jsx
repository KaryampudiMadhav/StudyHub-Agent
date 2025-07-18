import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { RocketIcon, SparklesIcon, BookOpenIcon, BotIcon } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const handleGenerateResource = ()=>{
     
  }
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-indigo-50 to-blue-100 text-gray-800">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between p-10 md:p-20">
        <div className="max-w-xl space-y-6">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            Welcome to <span className="text-indigo-600">Study Hub</span>
          </motion.h1>
          <p className="text-lg text-gray-700">
            Your personalized learning assistant. Discover curated content,
            track your progress, and get AI-powered study plans tailored just
            for you.
          </p>
          <div className="space-x-4">
            <button
              onClick={() => navigate("/signup")}
              className="bg-indigo-600 text-white px-6 py-2 rounded-2xl hover:bg-indigo-700 transition shadow-md"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate("/login")}
              className="bg-indigo-600 text-white px-6 py-2 rounded-2xl hover:bg-indigo-700 transition shadow-md"
            >
              Log in
            </button>
          </div>
        </div>
        <motion.img
          src="src/assets/learning.png"
          alt="Learning illustration"
          className="w-full max-w-md mt-10 md:mt-0"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        />
      </section>

      {/* Features */}
      <section className="p-10 md:p-20 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Core Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div className="p-6 bg-indigo-50 rounded-xl shadow-md hover:shadow-xl transition">
            <RocketIcon className="mx-auto mb-4 h-10 w-10 text-indigo-600" />
            <h3 className="text-xl font-semibold">Progress Tracker</h3>
            <p className="text-gray-600 mt-2">
              Track your learning goals, time spent, and completion rate with
              beautiful dashboards.
            </p>
          </div>
          <div className="p-6 bg-indigo-50 rounded-xl shadow-md hover:shadow-xl transition">
            <BookOpenIcon className="mx-auto mb-4 h-10 w-10 text-indigo-600" />
            <h3 className="text-xl font-semibold">Generate Resources</h3>
            <p className="text-gray-600 mt-2">
              Access handpicked courses, books, videos, and projects based on
              your skills and goals.
            </p>
          </div>
          <div
            className="p-6 bg-indigo-50 rounded-xl shadow-md hover:shadow-xl transition"
            onClick={handleGenerateResource}
          >
            <SparklesIcon className="mx-auto mb-4 h-10 w-10 text-indigo-600" />
            <h3 className="text-xl font-semibold">
              Generate AI-Powered Roadmap
            </h3>
            <p className="text-gray-600 mt-2">
              Inngest Agents generate dynamic learning paths customized to your
              pace and interests.
            </p>
          </div>
        </div>
      </section>

      {/* About Inngest AI */}
      <section className="p-10 md:p-20 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold flex justify-center items-center gap-2">
            <BotIcon className="inline-block h-7 w-7" />
            About Inngest AI
          </h2>
          <p className="text-lg leading-relaxed">
            Inngest AI powers the intelligence behind Study Hub. With background
            workflows, intelligent agents, and personalized insights, it
            provides students with timely suggestions, goal reminders, and
            resource recommendations.
          </p>
          <p>
            Using the Inngest Agent Kit and AI models like Gemini, our platform
            evolves with the user — giving you a smarter, more supportive study
            environment every time you log in.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 p-6 text-center">
        <p>
          © {new Date().getFullYear()} Study Hub · Built with 💙 using MERN &
          Inngest
        </p>
      </footer>
    </div>
  );
};

export default Home;
