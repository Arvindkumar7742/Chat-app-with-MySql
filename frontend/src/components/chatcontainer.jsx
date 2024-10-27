import { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import Picker from "emoji-picker-react";
import emojilogo from "../assets/emojilogo.jpg";
import chat_logo from "../assets/chat_logo.jpg";
import leave_chat_logo from "../assets/leav_chat.png";
import socketio from "socket.io-client";
import { Base, sendMessage, retrieveMassage } from "../Api_routes/route";
import { toast } from "react-hot-toast"
import { formatDateTime } from "../utills/dateFormatter"

const ChatContainer = () => {

     const socketRef = useRef(null);
     const endmessageRef = useRef(null);
     const [messageText, setMessageText] = useState("");
     const [allmessages, setAllmessages] = useState([]);
     const [isFetching, setIsFetching] = useState(true);
     const [emojiPickerShow, setEmojiPickerShow] = useState(false);
     const { currentReceiver, setCurrentReceiver } = useContext(ChatContext);
     const { user } = useContext(AuthContext);

     const fetchmessages = async () => {
          setIsFetching(true);
          let toastId = toast.loading("Loading...");
          try {
               const response = await axios.post(retrieveMassage, {
                    senderUserName: user.userName,
                    receiverUserName: currentReceiver.userName
               });
               console.log("response is:::", response)
               if (!response.data.success) {
                    throw new Error(response.data.message);
               }
               setAllmessages(response.data.data);
          }
          catch (error) {
               console.log("ERROR IN RETRIEVING THE MESSAGE::", error);
               toast.error(error.response.data.message);
          }
          setIsFetching(false);
          toast.dismiss(toastId);
     }


     useEffect(() => {
          const receiver = currentReceiver;
          if (currentReceiver) {
               socketRef.current = socketio.connect(Base);
               socketRef.current.emit("join-user", receiver.id);
          }
          return () => {
               socketRef.current.disconnect(receiver.id);
          }
     }, [currentReceiver])

     useEffect(() => {
          if (socketRef.current !== null) {
               socketRef.current.on("receive-msg", (message) => {
                    setAllmessages(prev => [...prev, message]);
               });
          }
     }, [user, currentReceiver]);

     useEffect(() => {
          fetchmessages();
          setIsFetching(false);
     }, [user, currentReceiver]);

     useEffect(() => {
          endmessageRef.current?.scrollIntoView();
     }, [allmessages])

     const handleSend = async (e) => {
          e.preventDefault();
          if (messageText === '') {
               return;
          }
          console.log("reciver is here==>>", currentReceiver);

          const message = {
               message_text: messageText,
               sender_user_name: user.userName,
               receiver_user_name: currentReceiver.userName,
               time: Date.now(),
          }

          setMessageText("");
          try {
               const response = await axios.post(sendMessage, message);
               if (!response.data.success) {
                    throw new Error(response.data.message);
               }
               socketRef.current.emit("send-msg", message, currentReceiver.id);
               setAllmessages((prev) => [...prev, message])
               setEmojiPickerShow(false);
          } catch (error) {
               console.log("ERROR FROM BACKEND SENDING MESSAGES:::", error);
               toast.error(error.response.data.message);
          }
     }


     const handleLeave = async (e) => {
          e.preventDefault();
          setCurrentReceiver(null);
     }

     const handleEmojiClick = (emojiObject) => {
          let msg = messageText;
          msg = msg + emojiObject.emoji;
          console.log(emojiObject.emoji);
          setMessageText(msg);
     }
     return (
          <div className="chat-container">
               <div className="chat-container-header">
                    <div className="roomname">
                         <img src={chat_logo} />
                         <h1>{currentReceiver.userName}</h1>
                    </div>
                    <div className="leaveroom">
                         <Link onClick={(e) => handleLeave(e)}>
                              <img src={leave_chat_logo} alt="" />
                              <b>LeaveChat</b></Link>
                    </div>
               </div>
               <div className="chat-container-body">
                    {!isFetching && allmessages.map((message, index) => (
                         
                         <div className={`chat-box ${message.sender_user_name === user.userName ? "self" : "other"}`} key={index}>
                              <div className="chat-content">
                                   <h2>{message.message_text}</h2>
                                   <p>{message.sender_user_name}&nbsp;&nbsp;{formatDateTime(message.time)}</p>
                              </div>
                         </div>
                    ))}
                    <div ref={endmessageRef}></div>
               </div>

               <div className="chat-container-input">
                    <div className="emoji">
                         <img src={emojilogo} onClick={() => { setEmojiPickerShow(!emojiPickerShow) }} />
                         <div className="emoji-picker">
                              {emojiPickerShow &&
                                   <Picker onEmojiClick={(emojiObject) => handleEmojiClick(emojiObject)}></Picker>
                              }

                         </div>
                    </div>

                    <input onKeyDown={(e) => e.key === "Enter" ? handleSend(e) : null} placeholder="Type message here" value={messageText} type="text" onChange={(e) => setMessageText(e.target.value)}
                    />
                    <button type="submit" onClick={(e) => handleSend(e)}>send</button>
               </div>
          </div>
     );
}

export default ChatContainer;