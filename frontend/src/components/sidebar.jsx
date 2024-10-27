import { useEffect } from "react";
import SidebarHeader from "./sidebarheader";
import {SidebarMain} from "./sideBarmain";

const Sidebar = () => {
   
    const handleShowSidebar=()=>{
        const element=document.getElementById("mysidebar");
        if(element.classList.contains("show-sidebar")){
            element.classList.remove("show-sidebar");
        }
        else{
            element.classList.add("show-sidebar");
        }
    }

    useEffect(()=>{
        const element=document.getElementById("mysidebar");
        if(element.classList.contains("show-sidebar")){
            element.classList.remove("show-sidebar");
        }
    })
   
    return ( 
        <>
         <div className="mobiles" onClick={handleShowSidebar}>
             <h1>Rooms</h1>
       </div>
        <div id="mysidebar" className="sidebar">
                <div  className="room-container">
                   <SidebarHeader></SidebarHeader>
                   <SidebarMain></SidebarMain>
                </div>
         </div>
        </>
     );
}
 
export default Sidebar;