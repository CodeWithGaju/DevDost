import React, { useEffect, useRef, useState } from 'react'
import { useAuthstore } from '../store/useAuthStore'
import { Link } from 'react-router-dom';
import {Flame,User,Heart,LogOut,Menu,Home} from "lucide-react"

const Header = () => {
    const {authUser,logOut} = useAuthstore();
    const [dropDown,setDropDown] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const dropDownRef = useRef(null);
    
   useEffect(()=>{
      const handleClickoutside = (event)=>{
        if(dropDownRef.current && !dropDownRef.current.contains(event.target)){
            setDropDown(false);
        }
        
      }
     document.addEventListener("mousedown", handleClickoutside)

     return () => document.removeEventListener("mousedown",handleClickoutside);
   },[])

  return (
    <div className='bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 shadow-lg'>

        <div className='max-w-7xl mx-auto  sm:px-6 lg:px-8'>
            <div className='flex justify-between items-center py-4'>
                <div className='flex items-center'>
                    <Link to="/" className='flex items-center space-x-2'></Link>
                    <Flame className='w-8 h-8 text-white' />
                    <span className='text-2xl font-bold text-white hidden sm:inline'>Swipe</span>
                </div>

                <div className='hidden md:flex  items-center space-x-4'>
                     { authUser ? (
                            <div className='relative'  ref={dropDownRef}>
                                <button onClick={()=>setDropDown(!dropDown)} className='flex items-center space-x-2 focus:outline-none'>
                                    <img src={authUser.photoUrl}
                                     className='h-10 w-10 object-cover rounded-full border-2 border-white' alt='User img'
                                    />
                                    <span className='font-medium text-white'>{authUser.firstName+" "+authUser.lastName}</span>
                                </button>
                                {dropDown && (
									<div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10'>
										<Link
											to='/'
											className='px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center'
											onClick={() => setDropDown(false)}
										>
											<Home className='mr-2' size={16} />
											Home
										</Link>
										<Link
											to='/profile'
											className='px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center'
											onClick={() => setDropDown(false)}
										>
											<User className='mr-2' size={16} />
											Profile
										</Link>
										<Link
											to='/notifications'
											className='px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center'
											onClick={() => setDropDown(false)}
										>
											<Heart className='mr-2' size={16} />
											Notifications
										</Link>
										<button
											onClick={logOut}
											className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center'
										>
											<LogOut className='mr-2' size={16} />
											Logout
										</button>
									</div>
								)}
                            </div>
                       ) : (<>
                        <Link
                            to='/auth'
                            className='block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-pink-700'
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Login
                        </Link>
                        <Link
                            to='/auth'
                            className='block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-pink-700'
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Sign Up
                        </Link>
                    </> )
                     }
                </div>
                
					<div className='md:hidden'>
						<button
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
							className='text-white focus:otline-none'
						>
							<Menu className='size-6' />
						</button>
					</div>
            </div>
        </div>

        {/* MOBILE MENU */}

			{mobileMenuOpen && (
				<div className='md:hidden bg-pink-600'>
					<div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
						{authUser ? (
							<>
							   <Link
									to='/'
									className='block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-pink-700'
									onClick={() => setMobileMenuOpen(false)}
								>
									Home
								</Link>
								<Link
									to='/profile'
									className='block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-pink-700'
									onClick={() => setMobileMenuOpen(false)}
								>
									Profile
								</Link>
								<Link
									to='/notifications'
									className='block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-pink-700'
									onClick={() => setMobileMenuOpen(false)}
								>
								   Notifications
								</Link>
								<button
									onClick={() => {
										logOut();
										setMobileMenuOpen(false);
									}}
									className='block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-pink-700'
								>
									Logout
								</button>
							</>
						) : (
							<>
								<Link
									to='/auth'
									className='block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-pink-700'
									onClick={() => setMobileMenuOpen(false)}
								>
									Login
								</Link>
								<Link
									to='/auth'
									className='block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-pink-700'
									onClick={() => setMobileMenuOpen(false)}
								>
									Sign Up
								</Link>
							</>
						)}
					</div>
				</div>
			)}

    </div>
  )
}

export default Header