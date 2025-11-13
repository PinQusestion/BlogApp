import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router";
import { login } from "../store/authSlice";
import { Button, Input } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const data = await authService.getCurrentUser();

        if (data) dispatch(login(data));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden" style={{ backgroundColor: '#1A2336' }}>
      {/* Animated background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -mr-32 -mt-32 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -ml-40 -mb-40 animate-pulse" style={{animationDelay: '1s'}}></div>

      <div
        className="mx-auto w-full max-w-lg rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-md relative z-10 border border-white/10 transform transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 animate-fade-in-up"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
        }}
      >
        {/* Decorative line */}
        <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>

        <h2 className="text-center text-3xl md:text-4xl font-bold leading-tight text-white mb-2 animate-fade-in-down">
          Create Account
        </h2>
        <p className="mt-2 text-center text-sm md:text-base text-slate-400 animate-fade-in-down" style={{animationDelay: '0.1s'}}>
          Join and start publishing your stories
        </p>

        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-semibold text-purple-400 transition-all duration-200 hover:text-purple-300 hover:underline"
          >
            Sign In
          </Link>
        </p>

        {error && (
          <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm text-center animate-shake">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(create)} className="mt-8 space-y-5">
          <div className="animate-fade-in-up signup-input" style={{animationDelay: '0.2s'}}>
            <label className="block mb-2 text-left text-slate-300 text-sm font-medium">Full Name</label>
            <Input
              placeholder="Enter your full name"
              className="w-full bg-white/5 placeholder-slate-500 border border-slate-600/50 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
              {...register("name", { required: true })}
            />
          </div>

          <div className="animate-fade-in-up signup-input" style={{animationDelay: '0.3s'}}>
            <label className="block mb-2 text-left text-slate-300 text-sm font-medium">Email Address</label>
            <Input
              placeholder="Enter your email"
              type="email"
              className="w-full bg-white/5 placeholder-slate-500 border border-slate-600/50 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Email address must be a valid address",
                },
              })}
            />
          </div>

          <div className="animate-fade-in-up signup-input" style={{animationDelay: '0.4s'}}>
            <label className="block mb-2 text-left text-slate-300 text-sm font-medium">Password</label>
            <Input
              type="password"
              placeholder="Create a strong password"
              className="w-full bg-white/5 placeholder-slate-500 border border-slate-600/50 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
              {...register("password", { required: true })}
            />
            <p className="text-xs text-slate-500 mt-1">At least 8 characters recommended</p>
          </div>

          <Button
            type="submit"
            bgColor="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
            textColor="text-white"
            className="w-full py-3 text-sm font-semibold shadow-lg hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 active:scale-95 rounded-xl animate-fade-in-up"
            style={{animationDelay: '0.5s'}}
          >
            Create Account
          </Button>

          <p className="text-xs text-slate-500 text-center mt-4 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
