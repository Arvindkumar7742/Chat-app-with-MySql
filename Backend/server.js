const express = require('express');
const cors = require('cors');
const { db } = require("./config/dbConnect")
const http=require("http");
const {Server}=require("socket.io");
require('dotenv').config();

const app = express();
//middlewares
app.use(express.json());
app.use(cors());

//Home route
app.get("/", (req, res) => {
    return res.json("You are on backend");
})

//user Routes
const userRoutes=require("./Routes/userRoutes");
app.use("/api/user",userRoutes);

//dummy route to fetch data
app.get('/students', (req, res) => {
    const sql = 'SELECT * FROM students';
    db.query(sql, (err, data) => {
        if (err) {
            console.log("error while the executing the query", err);
            return res.json(err);
        }
        return res.json(data);
    })
})

//To add the socket connections
const server=http.createServer(app);
app.listen(process.env.PORT, () => {
    console.log(`app is listing on port no ${process.env.PORT}`);
})

const io=new Server(server,{
    cors:{
      origin:process.env.ORIGIN_URL,
      methods:["GET","POST"]
    }
});


io.on("connection",(socket)=>{

      socket.on("join-room",(roomid)=>{
           socket.join(roomid);
      })

      socket.on("send-msg",(message,currentRoomid)=>{
          socket.to(currentRoomid).emit("receive-msg",message);
      });
      socket.on("disconnect",(roomid)=>{
         socket.leave(roomid);
      });
})