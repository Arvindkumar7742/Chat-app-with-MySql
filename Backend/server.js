const express= require('express');
const mysql = require('mysql');
const cors = require('cors');
const {db} = require("./config/dbConnect")
const app = express();
app.use(cors());

app.get("/",(req,res)=>{
    return res.json("You are on backend");
})

app.get('/users',(req,res)=>{
    const sql = 'SELECT * FROM students';
    db.query(sql,(err,data)=>{
        if(err){
            console.log("error while the executing the query",err);
            return res.json(err);
        }
        return res.json(data);
    })
})

app.listen('8080',()=>{
    console.log("app is listing on port no 8080");
})