import Sidebar from "../components/sidebar";
import ChatContainer from "../components/chatcontainer";
import { useContext } from "react";
import ChatPageHeader from "../components/chatpageheader";
import Welcome from "../components/welcome";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
        const { currentReceiver } = useContext(ChatContext);

        return (
                <div className="chatpage">
                        <ChatPageHeader></ChatPageHeader>
                        <div className="main">
                                <Sidebar></Sidebar>
                                {currentReceiver?<ChatContainer></ChatContainer>:<Welcome></Welcome>}
                        </div>
                </div>
        );
}

export default Chat;