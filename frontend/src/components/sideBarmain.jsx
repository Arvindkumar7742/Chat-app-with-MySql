import React from 'react'
import { AuthContext } from "../context/AuthContext";
import { allUsers } from "../Api_routes/route";
import { toast } from "react-hot-toast"
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ChatContext } from "../context/ChatContext";
import userImg from "../assets/user.png"

export const SidebarMain = () => {
  const [availableReceivers, setAvailableReceivers] = useState([]);
  const { setCurrentReceiver, setReceiverSelected } = useContext(ChatContext);
  const { user } = useContext(AuthContext);
  const [isFetching, setIsFetching] = useState(false);

  const fetchAvailableRooms = async () => {
    const toastId = toast.loading("Loading");
    setIsFetching(true);
    try {
      const response = await axios.post(allUsers);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      console.log("response from backend to fethc the users", response);
      setAvailableReceivers(response.data.users);
    } catch (error) {
      console.log("ERROR FROM FETCHING ALL USERS...", error);
      toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    setIsFetching(false);
  }
  useEffect(() => {
    fetchAvailableRooms();
  }, []);
  return (
    <div className="receivers-list">
      {!isFetching&& availableReceivers.map((receiver) => {
        if(receiver.userName!=user.userName){
          return   <div className="receiver-item" key={receiver.id} onClick={()=>{
            setCurrentReceiver(receiver);
          }}>
          <img src={userImg} alt="User Avatar" className="receiver-avatar" />
          <p className="receiver-name">{receiver.userName}</p>
        </div>
        }
})}
    </div>

  )
}
