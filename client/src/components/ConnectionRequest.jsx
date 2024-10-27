import React, { useEffect } from 'react'
import useMatchStore from '../store/useMatchStore'
import { CircleCheckBig ,CircleX} from 'lucide-react';

const ConnectionRequest = () => {
  const {ConnectionRequestData,ignoreRequest,acceptRequest} = useMatchStore();  
   const handleIgnore = (_id,index) => {
      ignoreRequest(_id);
      ConnectionRequestData.splice(index,1);
   }
   const handleAccept = (_id,index) => {
    acceptRequest(_id);
    ConnectionRequestData.splice(index,1);
 }
    return (
    <div className='relative md:w-3/4 md:mx-auto '>
      <div>
        <h1 className='text-2xl font-bold '>Connection Request</h1>
      </div> 
       {ConnectionRequestData?.map((conn,index)=>(<div key={conn._id} className="my-5 card card-side bg-base-100 shadow-xl bg-gradient-to-br to-pink-200 from-red-300">
          <figure>
           <img
            src={conn.fromUserId.photoUrl}
             alt="User Image" className='w-52 md:h-[200px]' />
            </figure>
           <div className="card-body text-sm top-0">
           <h2 className="card-title">{conn.fromUserId.firstName+" "+conn.fromUserId.lastName}</h2>
           <p>{conn.fromUserId.about}</p>
          <div className="card-actions justify-end ">
         <button className="btn btn-primary" onClick={()=> handleIgnore(conn._id,index)}><CircleX size={16}/> Ignore</button>
         <button className="btn btn-primary"  onClick={()=> handleAccept(conn._id,index)}><CircleCheckBig size={16}/> Accept</button>
         </div>
         
       </div>
    </div>))}
    </div>
  )
}

export default ConnectionRequest