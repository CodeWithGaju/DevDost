import React, { useState } from 'react'
import { useAuthstore } from '../store/useAuthStore';

const LoginForm = () => {
  const [emailId,setEmail] = useState();
  const [password,setPassword] = useState();
  const {signIn,loading} = useAuthstore();

  return <form className='space-y-4' onSubmit={(e)=>{
              e.preventDefault();
              signIn({emailId,password}); 
           }}>
         <div>
         <label htmlFor='emailId' className='text-sm font-medium text-gray-700'>Email Address</label>

         <div className='mt-1'>
         <input id='emailId' type='email' name='emailId' value={emailId} onChange={(e)=>setEmail(e.target.value)} autoComplete='email'  required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"/>
         </div>
         </div>
         <div>
         <label htmlFor='password' className='text-sm font-medium text-gray-700'>Password</label>

         <div className='mt-1'>
         <input id='password' type='password' name='password' value={password} onChange={(e)=>setPassword(e.target.value)} autoComplete='current-password'  required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"/>
         </div>
         </div>

         <button type='submit' className={`w-full flex justify-center py-2 px-4 border border-transparent 
					rounded-md shadow-sm text-sm font-medium text-white ${
						loading
							? "bg-pink-400 cursor-not-allowed"
							: "bg-pink-600 hover:bg-pink-700 focus:oudtline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
					}`} disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>

       </form>
}

export default LoginForm