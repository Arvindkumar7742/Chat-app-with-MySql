import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import  Chat  from "./pages/Chat";
import { Register } from "./pages/Register";
function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/register" element={user ? <Chat></Chat> : <Register></Register>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/chat" element={user ? <Chat></Chat> : <Login></Login>}></Route>
          <Route path="*" element={user ? <Chat></Chat> : <Login></Login>}></Route>
        </Routes>
      </Router>
    </div>

  );
}

export default App;