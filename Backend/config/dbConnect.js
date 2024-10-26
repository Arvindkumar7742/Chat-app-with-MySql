const mysql = require('mysql2');
require('dotenv').config();

exports.db = mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER_NAME,
    password:process.env.PASSWORD,
    database:process.env.DATABASE,
})