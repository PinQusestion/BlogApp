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
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: '#1A2336' }}>
      <div
        className="mx-auto w-full max-w-lg rounded-2xl p-10 shadow-2xl backdrop-blur-md"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))',
          border: '1px solid rgba(255,255,255,0.06)'
        }}
      >
        <h2 className="text-center text-3xl font-semibold leading-tight text-white">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Join and start publishing your posts
        </p>

        <p className="mt-4 text-center text-sm text-gray-400">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-indigo-400 transition-all duration-200 hover:underline hover:text-indigo-300"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-400 mt-6 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)} className="mt-8">
          <div className="space-y-5">
            <div>
              <label className="block mb-1 text-left text-gray-300 text-base">Full Name:</label>
              <Input
                placeholder="Enter your full name"
                className="bg-transparent text-black placeholder-gray-500 border border-gray-600 focus:ring-2 focus:ring-indigo-500"
                {...register("name", { required: true })}
              />
            </div>

            <div>
              <label className="block mb-1 text-left text-gray-300 text-base">Email:</label>
              <Input
                placeholder="Enter your email"
                type="email"
                className="bg-transparent text-black placeholder-gray-500 border border-gray-600 focus:ring-2 focus:ring-indigo-500"
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Email address must be a valid address",
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
                {...register("password", { required: true })}
              />
            </div>

            <Button
              type="submit"
              bgColor="bg-gradient-to-r from-indigo-600 to-blue-500"
              textColor="text-white"
              className="w-full py-3 text-sm font-medium shadow-md"
            >
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
