"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React, { useState, } from 'react'


const SignUpPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    password: "",
    confirmPassword: ""
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if(!formData.username || !formData.firstname || 
       !formData.lastname || !formData.password || 
       !formData.confirmPassword){
      setError("All fields are required")
      return
    }

    if(formData.password !== formData.confirmPassword){
      setError("confirmPw and Password do not match")
      return
    }

    if(formData.password.length < 6){
      setError("Password must be at least 6 characters")
      return
    }
    try {
      setLoading(true)
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: formData.username,
          firstName: formData.firstname,
          lastName: formData.lastname,
          password: formData.password,
          confirmPassword: formData.confirmPassword,

        })
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.message || "Signup fail vayo")
        return
      }

      
      router.push("/login")
    } catch (error: any) {
      console.log(error.message)
      setError(error.message)
    } finally {
      setLoading(false)
    }

  }



    return (
      <div className='flex justify-center items-center min-h-screen bg-yellow-500'>
        <div className="bg-white p-8 w-full max-w-lg shadow-2xl rounded-xl">
          <h1 className="font-bold text-2xl mb-4 text-center text-gray-800">
            Create Account
          </h1>
          {error && (<p className='text-red-500 text-sm text-center mb-4 bg-red-50 border border-red-200 rounded-lg p-3'>{error}</p>)}
          <form onSubmit={handleSubmit}>
            <div 
            className='bg-gray-100 rounded-lg p-3 mb-4 focus-within:ring-2 focus-within:ring-yellow-500 focus-within:bg-white transition-all '>
              <input type="text" name="username" value={formData.username} placeholder='Username ' className='w-full outline-none bg-transparent' onChange={handleChange} />
            </div>
            <div className='bg-gray-100 rounded-lg p-3 mb-4 focus-within:ring-2 focus-within:ring-yellow-500 focus-within:bg-white transition-all '>
              <input type="text" name="firstname" value={formData.firstname} placeholder='Firstname' className='w-full outline-none bg-transparent' onChange={handleChange} />
            </div>
            <div className='bg-gray-100 rounded-lg p-3 mb-4 focus-within:ring-2 focus-within:ring-yellow-500 focus-within:bg-white transition-all '>
              <input type="text" name="lastname" value={formData.lastname} placeholder='Lastname' className='w-full outline-none bg-transparent' onChange={handleChange} />
            </div>
            <div className='bg-gray-100 rounded-lg p-3 mb-4 focus-within:ring-2 focus-within:ring-yellow-500 focus-within:bg-white transition-all '>
              <input type="password" name="password" value={formData.password} placeholder='Password' className='w-full outline-none bg-transparent' onChange={handleChange} />
            </div>
            <div className='bg-gray-100 rounded-lg p-3 mb-4 focus-within:ring-2 focus-within:ring-yellow-500 focus-within:bg-white transition-all '>
              <input type="password" name="confirmPassword" value={formData.confirmPassword} placeholder='Confirm Password' className='w-full outline-none bg-transparent' onChange={handleChange} />
            </div>
            <button type='submit' className="w-full hover:bg-yellow-400 hover:text-white bg-yellow-500 py-3 rounded-xl font-semibold cursor-pointer transition-colors" disabled={loading}>{loading ? "Processing" : "Sign Up"}</button>
          </form>
          <p className="text-center text-gray-600 text-sm mt-8">Already have an account? {" "}
            
            <Link className="text-yellow-500 font-semibold hover:underline cursor-pointer" href="/login">Login</Link></p>
        </div>
      </div>
    )
  }

  export default SignUpPage