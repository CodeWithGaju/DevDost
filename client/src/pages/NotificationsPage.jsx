import React, { useEffect } from 'react'
import { useAuthstore } from '../store/useAuthStore'
import SideBar from '../components/SideBar';
import useMatchStore from '../store/useMatchStore';
import Header from '../components/Header';
import { Frown } from 'lucide-react';
import ConnectionRequest from '../components/ConnectionRequest';

const NotificationsPage = () => {
  const {ConnectionRequestData,isConnectionRequestLoading,getFeedUsers,checkRequestConnection} = useMatchStore();
  useEffect(()=>{
    checkRequestConnection();
  },[checkRequestConnection]);
  return (
    <div className='flex flex-col lg:flex-row min-h-screen  bg-gradient-to-br from-pink-100 to-purple-100 overflow-hidden'>
      <SideBar/>
      <div className='flex-grow flex flex-col overflow-hidden'>
        <Header/>
        <main className='flex-grow flex flex-col gap-10 top-10 p-10  relative overflow-hidden'>
          {ConnectionRequestData?.length > 0 && !isConnectionRequestLoading && (
            <>
                 <ConnectionRequest />
            </>
          )}

          {ConnectionRequestData?.length === 0 && !isConnectionRequestLoading && (
            <NoMoreProfiles />
          )}

          {
            isConnectionRequestLoading && <LoadingUI/>
          }
        </main>
      </div>
       
    </div>
  )
}

export default NotificationsPage


const NoMoreProfiles = () => (
	<div className='flex flex-col items-center justify-center h-full text-center p-8'>
		<Frown className='text-pink-400 mb-6' size={80} />
		<h2 className='text-3xl font-bold text-gray-800 mb-4'>Woah there, speedy fingers!</h2>
		<p className='text-xl text-gray-600 mb-6'>Bro are you OK? Maybe it&apos;s time to touch some grass.</p>
	</div>
);

const LoadingUI = () => {
	return (
		<div className='relative md:w-3/4 md:mx-auto'>
			<div className="my-5 card card-side bg-base-100 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
          <figure>
           <div className='bg-gray-100 w-52 h-[200px]'></div>
            </figure>
           <div className="card-body text-sm top-0">
           <h2 className="card-title h-8 bg-gray-200 rounded w-2/4"></h2>
           <p className='h-3 bg-gray-200 rounded w-3/4'></p>
          <div className="card-actions justify-end ">
         <button className="btn bg-gray-200 w-[100px] mt-2"></button>
         <button className="btn bg-gray-200 w-[100px] mt-2"></button>
         </div>
         
       </div>
    </div>
		</div>
	);
};
