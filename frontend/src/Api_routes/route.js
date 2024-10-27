const Base = "https://chat-app-with-mysql.onrender.com";


//User Routes

const loginRoute = Base + "/api/user/login";
const registerRoute = Base + "/api/user/createuser";
const allUsers = Base + "/api/user/allUsers";
const sendMessage = Base + "/api/user/sendMessage"
const retrieveMassage = Base + "/api/user/retrieveMessages"


export { Base, loginRoute, registerRoute ,allUsers, sendMessage , retrieveMassage}