import React from 'react'
import useMatchStore from '../store/useMatchStore'

const SwipeFeedBack = () => {
    const {swipeFeedBack} = useMatchStore();

    const getFeedBackStyle = (swipeFeedBack) => {
        if(swipeFeedBack === "interested") return "text-green-500";
        if(swipeFeedBack === "ignore") return "text-red-500"; 
        if(swipeFeedBack === "connection") return "text-pink-500";
    }
    const getFeedBackText = (swipeFeedBack) => {
        if(swipeFeedBack === "interested") return "Liked!";
        if(swipeFeedBack === "ignore") return "Passed"; 
        if(swipeFeedBack === "connection") return "It's a Connection!";
    }
  return (
    <div className={`absolute top-10 left-0 right-0 text-center text-2xl font-bold ${getFeedBackStyle(swipeFeedBack)}`}>
        {getFeedBackText(swipeFeedBack)}
    </div> 
  )
}

export default SwipeFeedBack