"use client";
import Navbar from "@/components/Navbar";
import React from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const RegisterCard = () => {
  const { data: session } = useSession();
  if (session) {
    redirect("/");
  }

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [message, setMessage] = React.useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/signup", formData);
      if (response.status === 201) {
        toast.success(response.data.message); // Show toast first
        setTimeout(() => {
          redirect("/login"); // Redirect after a short delay
        }, 1000);
      }
      setMessage(response.data.message || response.data.error);
    } catch (error) {
      setMessage(error.response?.data?.error || "Something went wrong");
      toast.error(error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <>
      <Navbar />
      <div className="items-center justify-center h-screen flex">
        <div className="flex flex-col w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl lg:flex-row">
          {/* Left Image Section */}
          <div
            className="w-full h-48 bg-cover lg:h-auto lg:w-1/2"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080')`,
            }}
          ></div>

          {/* Right Form Section */}
          <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
            <div className="flex justify-center mx-auto">
              <img
                className="w-auto h-7 sm:h-8"
                src="https://merakiui.com/images/logo.svg"
                alt="Logo"
              />
            </div>

            <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
              Create an account
            </p>

            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="registerName"
              >
                Full Name
              </label>
              <input
                id="registerName"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                placeholder="Enter your name"
                name="name"
                onChange={handleChange}
              />
            </div>

            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="registerEmail"
              >
                Email Address
              </label>
              <input
                id="registerEmail"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                type="email"
                placeholder="Enter your email"
                name="email"
                onChange={handleChange}
              />
            </div>

            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="registerPassword"
              >
                Password
              </label>
              <input
                id="registerPassword"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                type="password"
                placeholder="Create a password"
                name="password"
                onChange={handleChange}
              />
            </div>

            <div className="mt-6">
              <button
                className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                onClick={handleSubmit}
              >
                Register
              </button>
            </div>

            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
              <a
                href="/login"
                className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
              >
                Already have an account? Login
              </a>
              <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
            </div>

            <div className="mt-6">
              <button className="flex items-center justify-center w-full px-6 py-3 text-sm font-medium text-gray-600 capitalize transition-colors duration-300 transform bg-gray-100 border rounded-lg dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 .297C5.373.297 0 5.67 0 12.297c0 5.302 3.438 9.8 8.205 11.387.6.11.82-.261.82-.577v-2.165c-3.338.727-4.033-1.61-4.033-1.61-.546-1.387-1.333-1.755-1.333-1.755-1.091-.746.083-.73.083-.73 1.205.083 1.84 1.236 1.84 1.236 1.07 1.836 2.809 1.306 3.495.997.107-.776.418-1.306.76-1.606-2.665-.305-5.467-1.332-5.467-5.93 0-1.31.469-2.38 1.236-3.22-.124-.303-.536-1.524.116-3.176 0 0 1.009-.323 3.3 1.23a11.29 11.29 0 013.003-.404c1.018.005 2.045.137 3.003.404 2.29-1.553 3.297-1.23 3.297-1.23.653 1.653.241 2.874.118 3.176.769.84 1.236 1.91 1.236 3.22 0 4.61-2.807 5.623-5.48 5.92.43.371.814 1.102.814 2.222v3.293c0 .319.217.694.824.576C20.565 22.092 24 17.593 24 12.297 24 5.67 18.627.297 12 .297z"
                  />
                </svg>
                Sign up with GitHub
              </button>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />{" "}
    </>
  );
};

export default RegisterCard;
