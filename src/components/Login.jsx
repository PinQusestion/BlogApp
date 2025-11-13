import React, { useState } from "react";
import { Link, useNavigate } from 'react-router'
import { login as authLogin } from "../store/authSlice";
import { Button, Input } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (err) {
      setError(err?.message || "An unexpected error occurred");
    }
  };
 
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden" style={{ backgroundColor: '#1A2336' }}>
        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-32 -mt-32 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl -ml-40 -mb-40 animate-pulse" style={{animationDelay: '1s'}}></div>
        
        <div
          className="mx-auto w-full max-w-lg rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-md relative z-10 border border-white/10 transform transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 animate-fade-in-up"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
          }}
        >

        {/* Decorative line */}
        <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>

        <h2 className="text-center text-3xl md:text-4xl font-bold leading-tight text-white mb-2 animate-fade-in-down">
          Welcome Back
        </h2>
        <p className="mt-2 text-center text-sm md:text-base text-slate-400 animate-fade-in-down" style={{animationDelay: '0.1s'}}>
          Sign in to continue to your dashboard
        </p>

        <p className="mt-6 text-center text-sm text-slate-400">
          Don&apos;t have an account?&nbsp;
          <Link
            to="/signup"
            className="font-semibold text-blue-400 transition-all duration-200 hover:text-blue-300 hover:underline"
          >
            Create one
          </Link>
        </p>

        {error && (
          <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm text-center animate-shake">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(login)} className="mt-8 space-y-5">
          <div className="animate-fade-in-up login-input" style={{animationDelay: '0.2s'}}>
            <label className="block mb-2 text-left text-slate-300 text-sm font-medium">Email Address</label>
            <Input
              placeholder="you@example.com"
              type="email"
              className="w-full bg-white/5 placeholder-slate-500 border border-slate-600/50 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
              {...register("email", {
                required: "Email is required",
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
          </div>

          <div className="animate-fade-in-up login-input" style={{animationDelay: '0.3s'}}>
            <label className="block mb-2 text-left text-slate-300 text-sm font-medium">Password</label>
            <Input
              type="password"
              placeholder="Enter your password"
              className="w-full bg-white/5 placeholder-slate-500 border border-slate-600/50 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
              {...register("password", {
                required: "Password is required",
              })}
            />
          </div>

          <Button
            type="submit"
            bgColor="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
            textColor="text-white"
            className="w-full py-3 text-sm font-semibold shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 active:scale-95 rounded-xl animate-fade-in-up"
            style={{animationDelay: '0.4s'}}
          >
            Sign In
          </Button>

          <div className="flex items-center justify-between text-xs text-slate-400 mt-4 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
            <label className="flex items-center gap-2 cursor-pointer hover:text-slate-300 transition-colors">
              <input type="checkbox" className="w-4 h-4 bg-white/5 border border-slate-600 rounded accent-blue-500 cursor-pointer" />
              Remember me
            </label>
            <Link to="/" className="text-blue-400 hover:text-blue-300 transition-colors">Forgot password?</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
