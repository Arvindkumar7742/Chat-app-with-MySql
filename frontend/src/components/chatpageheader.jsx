import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { ChatContext } from "../context/ChatContext";
import { useNavigate } from "react-router-dom";
import userlogo from "../assets/userlogo.png"
import logout from "../assets/logout.jpg";

const ChatPageHeader = () => {
  const navigate=useNavigate();

    const {user,setUser}=useContext(AuthContext);
    const {setCurrentReceiver,setReceiverSelected}=useContext(ChatContext);
    
    const Logout=(e)=>{
        e.preventDefault();
        localStorage.removeItem("chat-user");
        setCurrentReceiver(null);
        setReceiverSelected(null);
        setUser(null);
        navigate("/");
    }
    return ( 
        <div className="header">
             <div className="username">
              <img src={userlogo} alt="userlogo" />
                <h1>{user.userName}</h1>
             </div>
             <div className="logout">
               <Link to="/" onClick={(e)=>Logout(e)}> <img src={logout} alt="" /> Logout</Link>
             </div>
           </div>
     );
}
 
export default ChatPageHeader;