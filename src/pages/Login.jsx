import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../CONFIG/env.js";
import { useNavigate, useLocation } from "react-router-dom";
import {useDispatch} from "react-redux"
import { login } from "../context/auth.slice.js";

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
//handling inputs change
  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  //login fucntion
  const signIn = async (e) => {
    e.preventDefault();

    try {
      const url = `${BACKEND_URL}/api/auth/sign-in`;
      const { email, password } = formData;

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ email, password }),
        credentials: "include", // 👈 required
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      console.log("Sign-in response:", data);

      if(res.status === 200){
        dispatch(login(data.data.user))
        navigate(`${location}`);
       
      }

    } catch (err) {
      console.error("Sign-in failed:", err.message);
    }
  };
  //register function
   const signUp = async(e)=>{
    e.preventDefault()
    try{
      const {name, email, password} = formData;
      const url = `${BACKEND_URL}/api/auth/sign-up`
      const res = await fetch(url, {
        method: "POST",
        headers:{
          "Content-type": "application/json",
          credentials: true,
        },
        body:JSON.stringify({name, email, password})
      });

      const data = await res.json();
  
      if(res.status === 200){
        dispatch(login(data.data.user))
        navigate(location)
      }

    }catch(err){
      console.log(err.message)
    }
    }


  



  return (
    <div className="w-screen h-screen bg-primary-2 flex items-center justify-center relative">
      <Link
        to="/"
        className="outline rounded-xs text-gray-200 bg-primary-1/80 duration-300 hover:bg-primary-1 p-2 position absolute top-10 left-10"
      >
        <ion-icon name="arrow-back-outline"></ion-icon> Back
      </Link>

      {type === "register" ? (
        <form
          onSubmit={signUp}
          className="border border-secondary-2/10 shadow-sm rounded-sm flex flex-col p-6"
        >
          <h1 className="w-full text-center font-semibold text-lg pb-3 text-secondary-2/60">
            SignUp
          </h1>
          <input
            value={formData.name}
            onChange={handleFormData}
            type="text"
            name="name"
            placeholder="Full Name"
            required
          />
          <input
            value={formData.email}
            onChange={handleFormData}
            type="email"
            name="email"
            placeholder="Email"
            required
          />
          <input
            value={formData.password}
            onChange={handleFormData}
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <p className="w-full flex justify-between p-1 text-gray-500 text-xs">
            Already have an account?{" "}
            <button
              type="button"
              className="cursor-pointer underline"
              onClick={() => setType("login")}
            >
              SignIn
            </button>
          </p>
          <button
            className="w-full p-1 text-sm text-primary-2 bg-primary-1/80 hover:bg-primary-1 duration-200 rounded-xs cursor-pointer"
            type="submit"
            
          >
            SignUp
          </button>
        </form>
      ) : (
        <form
          onSubmit={signIn}
          className="border border-secondary-2/10 shadow-sm rounded-sm flex flex-col p-6"
        >
          <h1 className="w-full text-center font-semibold text-lg pb-4 text-secondary-2/60">
            SignIn
          </h1>
          <input
            value={formData.email}
            onChange={handleFormData}
            type="email"
            name="email"
            placeholder="Email"
            required
          />
          <input
            value={formData.password}
            onChange={handleFormData}
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <p className="w-full flex justify-between text-xs text-gray-500 p-1">
            Don't have an account?{" "}
            <button
              type="button"
              className="cursor-pointer underline"
              onClick={() => setType("register")}
            >
              SignUp
            </button>
          </p>
          <button
            className="w-full p-1 text-sm rounded-xs text-primary-2 bg-primary-1/80 hover:bg-primary-1 duration-200 cursor-pointer"
            type="submit"
          >
            SignIn
          </button>
        </form>
      )}
    </div>
  );
};

export default Login;
