# 📘 Agent Study Hub – Skill-Based AI Learning Platform

Agent Study Hub is an intelligent, skill-based learning platform built with the MERN stack and powered by AI agents. It helps users analyze their selected skills and generates personalized learning paths, complete with video tutorials, documentation, step-wise modules, and quizzes.

---

## 🚀 Key Features

- 🔍 **Skill Analysis via AI Agent**  
  Users input their skills (e.g., "React", "Node.js") and an AI agent analyzes and generates a structured learning roadmap.

- 📚 **Personalized Learning Modules**  
  Each skill is broken down into modules with:
  - Learning steps
  - Curated video tutorials
  - Documentation and links
  - End-of-module quizzes

- 🧠 **AI-powered Learning Flow**  
  Dynamic suggestions and content from Inngest + Gemini agent integration.

- 🧾 **User Skill Profiles**  
  Each user has a profile that stores their selected skills and progress.

- 🧩 **Interactive Resource Page**  
  Displays modules, videos, documents, and allows users to navigate between different parts of their learning path.

- 🛠️ **MERN Stack Integration**  
  Built with MongoDB, Express.js, React, and Node.js for full-stack scalability.

---

## 🧰 Tech Stack

| Frontend       | Backend         | AI Agent      | State Mgmt | Styling       |
|----------------|------------------|----------------|------------|----------------|
| React.js       | Express.js       | Gemini / Inngest Agent | Zustand     | Tailwind CSS   |
| React Router   | Node.js          | OpenAI / Gemini APIs  |              |                |
| Axios          | MongoDB          | Inngest SDK          |              |                |

---

## 🚀 Getting Started

### Prerequisites

-   Node.js (v14 or later)
-   npm
-   MongoDB account and connection string
-   Inngest API Key

### Installation

1.  **Clone the repository**
  git clone https://github.com/KaryampudiMadhav/StudyHub-Agent/ 
2.  **Navigate to the project directory and install dependencies**
    cd your-repo-name
    # Install server dependencies
    npm install
    # Install client dependencies
    cd client
    npm install
3.  **Create a `.env` file in the root directory with the following variables:*
    PORT=...
    MONGO_DB_URI=...
    JWT_SECRET=...
    INNGEST_API_KEY=...
4.  **Run the application**
    # From the root directory, start the backend
    npm start
    # From the client directory, start the frontend
    npm run dev

## ✍️ Author

-   **Madhav Karyampudi**
-   [GitHub](https://github.com/KaryampudiMadhav)

