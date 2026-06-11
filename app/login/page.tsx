"use client";

import { User } from "@/models/user";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LogInPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setError("")

  console.log("1. Submit triggered")
  console.log("2. FormData:", formData)

  if (!formData.username || !formData.password) {
    setError("All fields are required!")
    return;
  }

  try {
    setLoading(true);
    console.log("3. Calling API...")
    
    const res = await fetch(`/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: formData.username,
        password: formData.password,
      }),
    });

    console.log("4. Response status:", res.status)
    console.log("5. Response ok:", res.ok)

    const data = await res.json();
    console.log("6. Response data:", data)

    if (!res.ok) {
      setError(data.error || "Login Failed")
      return;
    }

    console.log("7. Redirecting to /profile")
    router.push("/profile");

  } catch (error: any) {
    console.log("ERROR CAUGHT:", error.message)
    setError(error.message || "Network error. Try again.")
  } finally {
    setLoading(false);
  }
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    })
  };
  return (
    <div className="main min-h-screen bg-yellow-500 flex justify-center align-center">
      <div className="card max-w-lg bg-white w-full max-h-full m-30 rounded-lg p-8">
        <h1 className="text-center text-2xl font-bold p-2 text-yellow-600">
          Welcome!
        </h1>
        <h3 className="text-sm text-center">
          Login with your correct credentials
        </h3>
        {error &&(
          <p className="text-[12px] text-red-500 text-center mt-5 border bg-red-100 border-red-500 rounded-md p-1 ">{error}!</p>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <div className="flex flex-col mx-2 mt-2 ">
            <label htmlFor="username" className=" p-2">
              Username
            </label>
            <input
              className="text-xs outline-none text-black focus-within:bg-gray focus-within:ring-2 focus-within:ring-yellow-500 focus-within:bg-white p-3 rounded bg-gray-200 "
              type="text"
              value={formData.username}
              name="username"
              placeholder="e.g: dank.LIGHT"
              id="username"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col mx-2 my-2">
            <label className="p-2" htmlFor="password">Password</label>
            <input
              type="password"
              className="text-xs outline-none text-black focus-within:bg-gray focus-within:ring-2 focus-within:bg-white focus-within:ring-yellow-500 p-3 rounded bg-gray-200 "
              name="password"
              id="password"
              placeholder="Your Password"
              onChange={handleChange}
            />
          </div>
          <button disabled={loading} type="submit" className="bg-yellow-500 mt-auto mb-35 p-2 px-3 font-bold mt-2 rounded w-full">
            {loading ? "Logging In" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogInPage;
