import  { useEffect, useState } from "react";
import Header from "../components/Header";
import { useAuthStore } from "../store/useAuthStore";
import { useAgentStore } from "../store/useAiStore";
import toast from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const {authUser} = useAuthStore()
  const {addSkill,userSkills,fetchSkills,fetchSkillData,loadingSkill} = useAgentStore()
  
  useEffect(()=>{
    fetchSkills()
  },[userSkills])

const navigate  = useNavigate()
  const handleSubmit = async(e)=>{
      e.preventDefault()
      if(!newSkill){
          return toast.error("Enter The Skill")
      }
      await addSkill(newSkill);
      setNewSkill("")
      setShowAddSkill(false)
  }

  const handleNavigate = async(skill) =>{  
    try {
      await fetchSkillData(skill);
      navigate("/study")
    } catch (error) {
       console.log(error);
       toast.error(error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {authUser.fullName}
          </h2>
          <p className="text-gray-600">
            Continue your learning journey and master new skills.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <i className="fas fa-book text-blue-600 text-xl"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Skills</p>
                <p className="text-2xl font-bold text-gray-900">
                  {userSkills.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <i className="fas fa-chart-line text-green-600 text-xl"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Avg Progress</p>
                <p className="text-2xl font-bold text-gray-900">68%</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <i className="fas fa-file-alt text-purple-600 text-xl"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Resources</p>
                <p className="text-2xl font-bold text-gray-900">42</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-lg">
                <i className="fas fa-question-circle text-orange-600 text-xl"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Quizzes</p>
                <p className="text-2xl font-bold text-gray-900">28</p>
              </div>
            </div>
          </div>
        </div>

        {/* Add Skill Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-900">
              Add New Skill
            </h3>
            <button
              onClick={() => setShowAddSkill(!showAddSkill)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <i className="fas fa-plus mr-2"></i>Add Skill
            </button>
          </div>

          {showAddSkill && (
            <div className="border-t pt-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Enter skill you want to learn..."
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                />
                <button
                  onClick={handleSubmit}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <i className="fas fa-magic mr-2"></i>Generate Resources
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Your Skills
          </h3>
          {userSkills.length === 0 ? (
            <div>No skills Enrolled</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userSkills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm border hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-gray-900">
                        {skill}
                      </h4>
                      <div className="text-sm text-gray-500">75%</div>
                    </div>

                    <div className="mb-4">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: "75%" }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex justify-between text-sm text-gray-600 mb-4">
                      <span>
                        <i className="fas fa-file-alt mr-1"></i>15 Resources
                      </span>
                      <span>
                        <i className="fas fa-question-circle mr-1"></i>8 Quizzes
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleNavigate(skill)}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                        disabled={loadingSkill}
                      >
                        Start Study
                      </button>

                      <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
