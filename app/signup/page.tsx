import React from 'react'

const SignUpPage = () => {
  return (
    <div className='flex justify-center items-center min-h-screen bg-yellow-500'>
      <div className="bg-white p-8 w-full max-w-lg shadow-2xl rounded-xl">
        <h1 className="font-bold text-2xl mb-4 text-center text-gray-800">
    Create Account
        </h1>
        <form>
          <div className='bg-gray-100 rounded-lg p-3 mb-4 focus-within:ring-2 focus-within:ring-yellow-500 focus-within:bg-white transition-all '>
            <input type="text" placeholder='Username ' className='w-full outline-none bg-transparent ' />
          </div>
          <div className='bg-gray-100 rounded-lg p-3 mb-4 focus-within:ring-2 focus-within:ring-yellow-500 focus-within:bg-white transition-all '>
            <input type="text" placeholder='Firstname'  className='w-full outline-none bg-transparent' />
          </div>
          <div className='bg-gray-100 rounded-lg p-3 mb-4 focus-within:ring-2 focus-within:ring-yellow-500 focus-within:bg-white transition-all '>
            <input type="text" placeholder='Lastname'  className='w-full outline-none bg-transparent'/>
          </div>
          <div className='bg-gray-100 rounded-lg p-3 mb-4 focus-within:ring-2 focus-within:ring-yellow-500 focus-within:bg-white transition-all '>
            <input type="password" placeholder='Password'  className='w-full outline-none bg-transparent'/>
          </div>
          <div className='bg-gray-100 rounded-lg p-3 mb-4 focus-within:ring-2 focus-within:ring-yellow-500 focus-within:bg-white transition-all '>
            <input type="password" placeholder='Confirm Password' className='w-full outline-none bg-transparent' />
          </div>
          <button className="w-full hover:bg-yellow-400 hover:text-white bg-yellow-500 py-3 rounded-xl font-semibold cursor-pointer transition-colors">Sign Up</button>
        </form>
        <p className="text-center text-gray-600 text-sm mt-8">Already have an account? {" "} 
          <span className="font-semibold hover:underline cursor-pointer">Login</span></p>
      </div>
    </div>
  )
}

export default SignUpPage