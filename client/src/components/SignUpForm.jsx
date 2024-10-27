import React, { useState } from 'react'
import { useAuthstore } from '../store/useAuthStore';
const SignUpForm = () => {
  const [firstName,setFirstName] = useState("");   
  const [lastName,setLastName] = useState("");
  const [age,setAge] = useState("");      
  const [emailId,setEmail] = useState();
  const [password,setPassword] = useState();
  const [gender,setGender] = useState("")
  const [genderPreference,setGenderPreference] = useState("")
  const {loading,signup} = useAuthstore(); 
  return <form className='space-y-4' onSubmit={(e)=>{
	    e.preventDefault();
        signup({firstName,lastName,age,emailId,password,gender,genderPreference});
      } 
	}>
  <div>
  <label htmlFor='FirstName' className='texst-sm font-medium text-gray-700'>FirstName</label>

  <div>
  <input id='firstName'type='text' name='firstName' value={firstName} onChange={(e)=>setFirstName(e.target.value)} autoComplete='firstName'  required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"/>
  </div>
  </div>
  <div>
  <label htmlFor='lastName' className='text-sm font-medium text-gray-700'>LastName</label>

  <div>
  <input id='lastName'type='text' name='lastName' value={lastName} onChange={(e)=>setLastName(e.target.value)} autoComplete='lastName'  required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"/>
  </div>
  </div>
  <div>
  <label htmlFor='emailId' className='text-sm font-medium text-gray-700'>Email Address</label>

  <div>
  <input id='emailId'type='email' name='emailId' value={emailId} onChange={(e)=>setEmail(e.target.value)} autoComplete='email'  required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"/>
  </div>
  </div>
  <div>
  <label htmlFor='password' className='text-sm font-medium text-gray-700'>Password</label>

  <div>
  <input id='password' type='password' name='password' value={password} onChange={(e)=>setPassword(e.target.value)} autoComplete='current-password'  required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"/>
  </div>
  </div>

  <div>
  <label htmlFor='age' className='text-sm font-medium text-gray-700'>Age</label>

  <div>
  <input id='age'type='number' name='age' value={age} onChange={(e)=>setAge(e.target.value)} min="18" max="120"  required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"/>
  </div>
  </div>

  <div>
				<label className='block text-sm font-medium text-gray-700'>Your Gender</label>
				<div className='mt-2 flex gap-2'>
					<div className='flex items-center'>
						<input
							id='male'
							name='gender'
							type='checkbox'
							checked={gender === "male"}
							onChange={() => setGender("male")}
							className='h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded'
						/>
						<label htmlFor='male' className='ml-2 block text-sm text-gray-900'>
							Male
						</label>
					</div>
					<div className='flex items-center'>
						<input
							id='female'
							name='gender'
							type='checkbox'
							checked={gender === "female"}
							onChange={() => setGender("female")}
							className='h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded'
						/>
						<label htmlFor='female' className='ml-2 block text-sm text-gray-900'>
							Female
						</label>
					</div>
				</div>
			</div>

  {/* GENDER PREFERENCE */}
			<div>
				<label className='block text-sm font-medium text-gray-700'>Prefer Me</label>
				<div className='mt-2 space-y-2'>
					<div className='flex items-center'>
						<input
							id='prefer-male'
							name='gender-preference'
							type='radio'
							value='male'
							checked={genderPreference === "male"}
							onChange={(e) => setGenderPreference(e.target.value)}
							className='h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300'
						/>
						<label htmlFor='prefer-male' className='ml-2 block text-sm text-gray-900'>
							Male
						</label>
					</div>
					<div className='flex items-center'>
						<input
							id='prefer-female'
							name='gender-preference'
							type='radio'
							value='female'
							checked={genderPreference === "female"}
							onChange={(e) => setGenderPreference(e.target.value)}
							className='h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300'
						/>
						<label htmlFor='prefer-female' className='ml-2 block text-sm text-gray-900'>
							Female
						</label>
					</div>
					<div className='flex items-center'>
						<input
							id='prefer-both'
							name='gender-preference'
							type='radio'
							value='both'
							checked={genderPreference === "both"}
							onChange={(e) => setGenderPreference(e.target.value)}
							className='h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300'
						/>
						<label htmlFor='prefer-both' className='ml-2 block text-sm text-gray-900'>
							Both
						</label>
					</div>
				</div>
			</div>
    

  <button type='submit' className={`w-full flex justify-center py-2 px-4 border border-transparent 
   rounded-md shadow-sm text-sm font-medium text-white ${
     loading
       ? "bg-pink-400 cursor-not-allowed"
       : "bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
   }`} disabled={loading} >
     {loading ? "Signing in..." : "Sign in"}
   </button>

</form>
}

export default SignUpForm