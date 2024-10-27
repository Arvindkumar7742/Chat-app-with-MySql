import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AuthContextProvider from './context/AuthContext';
import ChatContextProvider from './context/ChatContext';
import {Toaster} from "react-hot-toast"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <ChatContextProvider>
      <App />
      <Toaster/>
      </ChatContextProvider>
    </AuthContextProvider>

  </React.StrictMode>
);

