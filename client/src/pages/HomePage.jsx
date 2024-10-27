import React, { useEffect } from 'react'
import { useAuthstore } from '../store/useAuthStore'
import SideBar from '../components/SideBar';
import useMatchStore from '../store/useMatchStore';
import Header from '../components/Header';
import { Frown } from 'lucide-react';
import SwipeArea from '../components/SwipeArea';
import SwipeFeedBack from '../components/SwipeFeedBack';

const HomePage = () => {
  const {feedUsers,isloadingFeedUsers,getFeedUsers, subscibeToNewMatches,unsubscribeFromNewMatches} = useMatchStore();

  const {authUser} = useAuthstore();

  useEffect(()=>{
    getFeedUsers();
  },[getFeedUsers]);

  useEffect(()=>{
    authUser && subscibeToNewMatches();
    return () => {
      unsubscribeFromNewMatches();
    }
  },[subscibeToNewMatches,unsubscribeFromNewMatches,authUser]);

  return (
    <div className='flex flex-col lg:flex-row min-h-screen  bg-gradient-to-br from-pink-100 to-purple-100 overflow-hidden'>
      <SideBar/>
      
      <div className='flex-grow flex flex-col overflow-hidden'>
        <Header/>
        <main className='flex-grow flex flex-col gap-10 justify-center items-center p-4 relative overflow-hidden'>
          {feedUsers?.length > 0 && !isloadingFeedUsers && (
            <>
            <SwipeArea />
            <SwipeFeedBack />
            </>
          )}

          {feedUsers?.length === 0 && !isloadingFeedUsers && (
            <NoMoreProfiles/>
          )}

          {
            isloadingFeedUsers && <LoadingUI/>
          }
        </main>
      </div>
       
    </div>
  )
}

export default HomePage


const NoMoreProfiles = () => (
	<div className='flex flex-col items-center justify-center h-full text-center p-8'>
		<Frown className='text-pink-400 mb-6' size={80} />
		<h2 className='text-3xl font-bold text-gray-800 mb-4'>Woah there, speedy fingers!</h2>
		<p className='text-xl text-gray-600 mb-6'>Bro are you OK? Maybe it&apos;s time to touch some grass.</p>
	</div>
);

const LoadingUI = () => {
	return (
		<div className='relative w-full max-w-sm h-[28rem]'>
			<div className='card bg-white w-96 h-[28rem] rounded-lg overflow-hidden border border-gray-200 shadow-sm'>
				<div className='px-4 pt-4 h-3/4'>
					<div className='w-full h-full bg-gray-200 rounded-lg' />
				</div>
				<div className='card-body bg-gradient-to-b from-white to-pink-50 p-4'>
					<div className='space-y-2'>
						<div className='h-6 bg-gray-200 rounded w-3/4' />
						<div className='h-4 bg-gray-200 rounded w-1/2' />
					</div>
				</div>
			</div>
		</div>
	);
};