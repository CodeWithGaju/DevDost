import React, { useRef, useState } from 'react'
import Header from '../components/Header';
import useUserStore from '../store/useUserStore';
import { useAuthstore } from '../store/useAuthStore';
import {XCircle} from "lucide-react"
import { CirclePlus } from 'lucide-react';

const ProfilePage = () => {
  const {authUser} = useAuthstore();
  const {loading,updateProfile} = useUserStore();
  const [firstName,setFirstName] = useState(authUser.firstName || "");
  const [lastName,setLastName] = useState(authUser.lastName || "");
  const [age,setAge] = useState(authUser.age || "");
  const [gender,setGender] = useState(authUser.gender || "male");
  const [genderPreference,setGenderPreference] = useState(authUser.genderPreference || "");
  const [about,setAbout] = useState(authUser.about || "");
  const [skills,setSkills] = useState(authUser.skills || []);
  const [photoUrl,setPhotoUrl] = useState(authUser.photoUrl || "");

  const skillsRef = useRef(null);
  const fileInputRef = useRef(null)


    const addSkills = () => {
      if(skillsRef.current.value !== ""){
        setSkills([...skills,skillsRef.current.value]);
          skillsRef.current.value = "";
      }  
    }

   const removeSkills = (indexToRemove) => {
     setSkills(skills.filter((_,index)=>index !== indexToRemove))
   }
  
  const handleImageChange = (e) => {
     const file = e.target.files[0];
     if(file){
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result);
      };
      reader.readAsDataURL(file);
     }
  }

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col'>
      <Header/>

      <div className='flex-grow flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8'>
            <div className='sm:mx-auto sm:w-full sm:mx-wd-md'>
               <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Your Profile</h2>
            </div>

           <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
             <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-200'>
                <form onSubmit={(e)=>{
                  e.preventDefault();
                  updateProfile({firstName,lastName,age,gender,genderPreference,about,skills,photoUrl});
              }} className='space-y-6'>
                  {/* firstName */}
                  <div>
                    <label htmlFor='name' className='block text-sm font-medium text-gray-700'>FirstName</label>
                    <div className='mt-1'>
                       <input id="firstName" name='firstName' type='text' required  value={firstName} onChange={(e)=> setFirstName(e.target.value)} className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm'></input>
                    </div>
                  </div>
                  {/* lastName */}
                  <div>
                    <label htmlFor='lastName' className='block text-sm font-medium text-gray-700'>LastName</label>
                    <div className='mt-1'>
                       <input id="lastName" name='lastName' type='text' required  value={lastName} onChange={(e)=> setLastName(e.target.value)} className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm'></input>
                    </div>
                  </div>
                  {/* age */}
                  <div>
                    <label htmlFor='age' className='block text-sm font-medium text-gray-700'>Age</label>
                    <div className='mt-1'>
                       <input id="age" name='age' type='number'   value={age} onChange={(event)=> setAge(event.target.value)} className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm'></input>
                    </div>
                  </div>
                   {/* gender */}
                   <div>
                    <span className='block text-sm font-medium text-gray-700 mb-2'>Gender</span>
                    <div className='flex space-x-4'>
                      {["Male","Female"].map((option)=>(
                        <label key={option} className='inline-flex items-center'>
                          <input type='radio' name='gender' value={option.toLowerCase()} checked={gender === option.toLowerCase()}
                            onChange={()=>setGender(option.toLowerCase())}
                          ></input>
                          <span className='ml-2'>{option}</span> 
                        </label>
                      ))}
                    </div>
                  </div>
                  {/* genderPreference */}
                  <div>
                    <span className='block text-sm font-medium text-gray-700 mb-2'>Gender Preference</span>
                    <div className='flex space-x-4'>
                      {["Male","Female","Both"].map((option)=>(
                        <label key={option} className='inline-flex items-center'>
                          <input type='checkbox' name='genderPreference' className='form-checkbox text-pink-600' value={option.toLowerCase()} checked={genderPreference.toLowerCase() === option.toLowerCase()}
                            onChange={()=>setGenderPreference(option.toLowerCase())}
                          ></input>
                          <span className='ml-2'>{option}</span> 
                        </label>
                      ))}
                    </div>
                  </div>
                  {/* about */}
                  <div>
                    <label htmlFor='about' className='block text-sm font-medium text-gray-700'>About</label>
                    <div className='mt-1'>
                       <textarea id="about" name='about' rows={3} value={about} onChange={(e)=> setAbout(e.target.value)} className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm'></textarea>
                       {about.length > 120 ? <p className='text-red-600 text-sm font-semibold mt-1 '>Your about should be in under 120 characters</p> : null}
                    </div>
                  </div>
                  {/* skills */}
                  <div>
                    <label htmlFor='skills' className='block text-sm font-medium text-gray-700'>Skills</label>
                    <div className='mt-1'>
                  
                        <ul className='flex flex-wrap appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm'>
                           {skills.map((skill,index)=>  index<10  ? (
                            <li key={index} className='bg-gray-200 w-auto rounded-md py-1 px-2 m-1 flex space-x-2'>
                             <span>{skill}</span>
                             <XCircle className='w-3 h-3 justify-center mt-1' onClick={()=>removeSkills(index)}/>
                            </li>
                            ) : null
                          )}
                             <div className='flex '>
                             <input type='text' ref={skillsRef} max={5} placeholder={skills.length > 10 ? "Max Number of skills Reached" : "Add Skills"} className='py-1 m-1 px-2  border border-gray-300 rounded-md  sm:text-sm'  onKeyUp={(event) => event.target.value}/>
                             <CirclePlus className='w-4 h-4 mt-3 justify-items-center mr-1' onClick={()=>addSkills() }/>
                             </div>
                        </ul>
                        {skills.length > 10 ? <p className='text-red-600 text-sm font-semibold mt-1 '>Max Number of skills Reached</p> : null} 
                         
                    </div>
                  </div>
                  {/* photoUrl */}
                  <div>
                    <label htmlFor='photoUrl' className='block text-sm font-medium text-gray-700'>Cover Image</label>
                    <div className='mt-2 flex items-center'>
                      <button type='button' onClick={()=>fileInputRef.current.click()} className='inline-flex items-center px-4 py-2 
                      border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500' >
                        Upload Image
                      </button>
                      <input ref={fileInputRef} type='file' accept='image/*' className='hidden' onChange={handleImageChange}></input>
                    </div>
                  </div>
                   {photoUrl && (
                    <div className='mt-4'>
                      <img src={photoUrl} alt="User Image" className='w-48 h-full object-cover rounded-md'></img>

                    </div> 
                   )}
                  {/* Submit Button */}
                  <button type='submit' className={`w-full flex justify-center py-2 px-4 border border-transparent 
					             rounded-md shadow-sm text-sm font-medium text-white ${
						            loading
							          ? "bg-pink-400 cursor-not-allowed"
							          : "bg-pink-600 hover:bg-pink-700 focus:oudtline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
					               }`} disabled={loading}>
                       {loading ? "Saving..." : "Save"}
                  </button>
                </form>
             </div>
           </div>
      </div>
    </div>
  )
}

export default ProfilePage

