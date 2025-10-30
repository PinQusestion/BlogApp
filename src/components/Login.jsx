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
      <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: '#1A2336' }}>
        <div
          className="mx-auto w-full max-w-lg rounded-2xl p-10 shadow-2xl backdrop-blur-md"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))',
            border: '1px solid rgba(255,255,255,0.06)'
          }}
        >

        {/* Logo removed to keep layout minimal */}

        <h2 className="text-center text-3xl font-semibold leading-tight text-white">
          Welcome back
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Sign in to continue to your dashboard
        </p>

        <p className="mt-4 text-center text-sm text-gray-400">
          Don&apos;t have an account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-indigo-400 transition-all duration-200 hover:underline hover:text-indigo-300"
          >
            Create one
          </Link>
        </p>

        {error && <p className="text-red-400 mt-6 text-center">{error}</p>}

        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <div>
              <label className="block mb-1 text-left text-gray-300 text-base">Email:</label>
              <Input
                placeholder="you@example.com"
                type="email"
                className="bg-transparent text-black placeholder-gray-500 border border-gray-600 focus:ring-2 focus:ring-indigo-500"
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

            <div>
              <label className="block mb-1 text-left text-gray-300 text-base">Password:</label>
              <Input
                type="password"
                placeholder="Enter your password"
                className="bg-transparent text-black placeholder-gray-500 border border-gray-600 focus:ring-2 focus:ring-indigo-500"
                {...register("password", {
                  required: "Password is required",
                })}
              />
            </div>

            <Button
              type="submit"
              bgColor="bg-gradient-to-r from-indigo-600 to-blue-500"
              textColor="text-white"
              className="w-full py-3 text-sm font-medium shadow-md"
            >
              Sign in
            </Button>

            <div className="flex items-center justify-between text-xs text-gray-400 mt-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 bg-transparent border-gray-600 rounded" />
                Remember me
              </label>
              <Link to="/" className="text-indigo-300 hover:underline">Forgot password?</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
