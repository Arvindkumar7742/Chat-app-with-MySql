import { createContext, useState } from "react";
export const ChatContext=createContext();

const ChatContextProvider=({children})=>{
    const [receiverSelected,setReceiverSelected]=useState(null);
    const [currentReceiver,setCurrentReceiver]=useState(null);
    return(
        <ChatContext.Provider value={{receiverSelected,setReceiverSelected,currentReceiver,setCurrentReceiver}}>{children}</ChatContext.Provider>
    );
   
}
export default ChatContextProvider;