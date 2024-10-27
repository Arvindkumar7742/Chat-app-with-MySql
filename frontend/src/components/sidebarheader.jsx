import logo from "../assets/roomslogo.png";

const SidebarHeader = () => {

    return (
        <div className="sidebar-header">
            <div className="sidebar-logo">
                <img src={logo} alt="App Logo" className="logo-img" />
                <h1>Chat App</h1>
            </div>
            <div className="sidebar-actions">
            </div>
        </div>
    );
}

export default SidebarHeader;