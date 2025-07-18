import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

export default function Signup() {
  const { logIn, isLoggingIn } = useAuthStore();
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword : ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
       e.preventDefault();
       console.log(form);
       if(!form.email || !form.password || !form.confirmPassword){
         return toast.error("Enter all the fileds..")
       }
       if(form.password < 6){
         return toast.error("Password must be atleast 6 characters")
       }
       logIn(form);
       setForm({
         email: "",
         password: "",
         confirmPassword: "",
       });
     };

  return (
    <div className="flex h-screen">
      {/* Left - Login Form */}
      <div className="w-1/2 flex flex-col justify-center items-center p-10">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-2">Login in to your account</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
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
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
              disabled={isLoggingIn}
            >
              Log in
            </button>
            <p className="mt-10 text-center text-sm/6 text-gray-500">
              Not a member?
              <a
                href="/signup"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Go to Signup
              </a>
            </p>
          </form>
        </div>
      </div>

      {/* Right - Image Section */}
      <div className="w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1567878673047-0451c851056e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGdvZHxlbnwwfHwwfHx8MA%3D%3D"
          alt="Rama"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
}
