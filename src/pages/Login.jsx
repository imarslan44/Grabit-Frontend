import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BACKEND_URL } from "../config/env.js";
import { useDispatch } from "react-redux";
import { login } from "../context/auth.slice.js";
import { assets } from "../assets/assets.js";

const Login = () => {
  const [type, setType] = useState("login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation().state?.from || "/";

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const signIn = async (e) => {
    e.preventDefault();
    try {
      const url = `${BACKEND_URL}/api/auth/sign-in`;
      const { email, password } = formData;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await res.json();
      if (res.status === 200) {
        dispatch(login(data.data.user));
        navigate(location);
      }
    } catch (err) {
      console.error("Sign-in failed:", err.message);
    }
  };

  const signUp = async (e) => {
    e.preventDefault();
    try {
      const { name, email, password } = formData;
      const url = `${BACKEND_URL}/api/auth/sign-up`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (res.status === 200) {
        dispatch(login(data.data.user));
        navigate(location);
      }

    } catch (err) {
      console.log(err.message);
    }
  };


  return (
    <div className="min-h-screen w-screen flex bg-[#f5f6f8] z-100">
      {/* LEFT SIDE (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-white to-gray-100/50 items-center justify-center p-16 z-100">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 leading-tight">
            {type === "login" ? "Welcome Back" : "Join GrabIt"}
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            {type === "login"
              ? "Shop smarter. Live better."
              : "Create your account and start shopping today."}
          </p>
          <div className="mt-10 space-y-3 text-gray-700">
            <p>✔ Secure checkout</p>
            <p>✔ Fast delivery</p>
            <p>✔ 12,000+ happy customers</p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-6 sm:px-12 z-100 p-10 bg-gradient-to-br from-white to-gray-100/50 ">
          <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-md shadow-xl relative">
          {/* Back Button */}
          <Link
            to="/"
            className="absolute top-5 left-5 text-gray-500 hover:text-gray-800 transition">
            ← Back
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">
            {type === "login" ? "Sign In" : "Sign Up"}
          </h2>
          <p className="text-center text-gray-500 mb-6">
            {type === "login"
              ? "Welcome back! Please enter your details."
              : "Create your account to continue."}
          </p>
          <form
            onSubmit={type === "login" ? signIn : signUp}
            className="space-y-4">
            {type === "register" && (
              <input
                value={formData.name}
                onChange={handleFormData}
                type="text"
                name="name"
                placeholder="Full Name"
                required
                className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 transition"
              />
            )}
            <input
              value={formData.email}
              onChange={handleFormData}
              type="email"
              name="email"
              placeholder="Email"
              required
              className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 transition"
            />
            <input
              value={formData.password}
              onChange={handleFormData}
              type="password"
              name="password"
              placeholder="Password"
              required
              className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 transition"
            />
            <button
              type="submit"
              className="w-full h-12 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition duration-300"
            >
              {type === "login" ? "Sign In" : "Create Account"}
            </button>
          </form>
          <div className="text-center mt-6 text-sm text-gray-500">
            { type === "login" ? (
              <>
                Don’t have an account?{" "}
                <button
                  onClick={() => setType("register")}
                  className="text-gray-900 font-medium hover:underline"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setType("login")}
                  className="text-gray-900 font-medium hover:underline"
                >
                  Sign In
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
