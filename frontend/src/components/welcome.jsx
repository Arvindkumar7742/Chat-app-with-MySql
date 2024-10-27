import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const  Welcome= () => {
    const{user}=useContext(AuthContext);
    return ( 
        <div className="welcome">
            <h1>Welcome to the Chat App {user.userName}</h1>
            <h2>Select a room to join the chat </h2>
        </div>
     );
}
 
export default Welcome;