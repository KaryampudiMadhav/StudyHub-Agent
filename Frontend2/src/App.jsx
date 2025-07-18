import { Route, Routes, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import LoginPage from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/landing"
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import ProfilePage from './pages/profilePage';
import SettingsPage from "./pages/settings";
import { useThemeStore } from "./store/useTheme";
import Navbar from './components/Nav';
import Dashboard from "./pages/Dashboard";
import StudyPage from './pages/studyPage';
import QuizPage from "./pages/Quiz";
import Resource from './pages/Resource';
import ModulePage from "./pages/Module";


const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const {theme } = useThemeStore()
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  console.log({ authUser });
  if (isCheckingAuth) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin size-8 text-indigo-600" />
      </div>
    );
  }

  return (
    <div data-theme={theme}>
      <Routes>
        <Route path="/" element={!authUser ? <Home /> : <Dashboard />} />
        <Route
          path="/home"
          element={authUser ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <Signup /> : <Navigate to="/home" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/home" />}
        />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/study"
          element={authUser ? <StudyPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/quiz/:index"
          element={authUser ? <QuizPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/resource"
          element={authUser ? <Resource /> : <Navigate to="/login" />}
        />
        <Route
          path="/modules/:index"
          element={authUser ? <ModulePage /> : <Navigate to="/login" />}
        />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
