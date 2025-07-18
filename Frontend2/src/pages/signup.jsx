// Hanuman Login Page in React with Tailwind CSS
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
const Signup = () => {
  const {isSigningUp,signUp} = useAuthStore()
  const [form, setForm] = useState({
      email: "",
      password: "",
      fullName : ""
    });
  
    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(form);
      if(!form.email || !form.password || !form.fullName){
        return toast.error("Enter all the fileds..")
      }
      signUp(form);
      setForm({
        email: "",
        password: "",
        fullName :""
      });
    };
  
  return (
    <div className="flex h-screen">
      {/* Left - Login Form */}
      <div className="w-1/2 flex flex-col justify-center items-center p-10">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-2">Sign in to your account</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="email"
              placeholder="Email address"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
              disabled={isSigningUp}
            >
              Sign in
            </button>
            <p className="mt-10 text-center text-sm/6 text-gray-500">
              already a member?
              <a
                href="/login"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Go to Login
              </a>
            </p>
          </form>
        </div>
      </div>

      {/* Right - Image Section */}
      <div className="w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1709099280321-9c81a6042b16?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGhhbnVtYW58ZW58MHx8MHx8fDA%3D"
          alt="Rama"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default Signup;
