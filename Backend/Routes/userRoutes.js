const router = require("express").Router();
const { db } = require('../config/dbConnect');

router.post("/createuser", (req, res) => {
    const { userEmail, userName, password } = req.body;
    if (!userEmail || !userName || !password) {
        return res.status(400).json({
            success: false,
            message: "Provide all the data filed",
        })
    }

    const isUserNamePresent = "SELECT * FROM `users` WHERE `userName` = ?";

    db.query(isUserNamePresent, [userName], (err, data) => {
        if (err) {
            console.error("Error in query", err);
            return res.status(500).json({ success: false, message: "Database error" });
        }

        if (data.length > 0) {
            // User already exists
            return res.status(400).json({ success: false, message: "User Name already exists" });
        } else {
            const isUserEmailPresent = "SELECT * FROM `users` WHERE `userEmail` = ?";

            db.query(isUserEmailPresent, [userEmail], (err, data) => {
                if (err) {
                    console.error("Error in query", err);
                    return res.status(500).json({ success: false, message: "Database error" });
                }
                else if (data.length > 0) {
                    // User already exists
                    return res.status(400).json({ success: false, message: "User Email already exists" });
                } else {
                    // User does not exist, proceed with insertion
                    const insertUser = "INSERT INTO `users` (`userEmail`, `userName`, `password`) VALUES (?, ?, ?)";
                    db.query(insertUser, [userEmail, userName, password], (err, newUserData) => {
                        if (err) {
                            console.error("Error inserting user", err);
                            return res.status(500).json({ message: "Failed to create user" });
                        }
                        // Now, fetch the newly created user data using LAST_INSERT_ID()
                        const getUser = "SELECT * FROM `users` WHERE `id` = LAST_INSERT_ID()";

                        db.query(getUser, (err, newUserData) => {
                            if (err) {
                                console.error("Error fetching new user", err);
                                return res.status(500).json({ success: false, message: "Error fetching created user" });
                            }

                            console.log("User created successfully:", newUserData);
                            return res.status(201).json({ success: true, message: "User created successfully", user: newUserData[0] });
                        });
                    });
                }
            })
        }
    });
});

router.post("/login", (req, res) => {
    const { userEmail, password } = req.body;
    if (!userEmail || !password) {
        return res.status(400).json({
            success: false,
            message: "Provide all the data filed",
        })
    }

    const isUserPresent = "SELECT * FROM `users` WHERE `userEmail` = ?";

    db.query(isUserPresent, [userEmail], (err, data) => {
        if (err) {
            console.error("Error in query", err);
            return res.status(500).json({ success: false, message: "Database error" });
        }

        if (data.length == 0) {
            // User already exists
            return res.status(400).json({ success: false, message: "User Not exist" });
        }
        else if(data[0].password != password){
            return res.status(400).json({ success: false, message: "Password does not match" });
        }
        else {
            return res.status(200).json({ success: true, data: data[0] });
        }
    });
});


router.post("/sendMessage", (req, res) => {
    const { sender_user_name, receiver_user_name, message_text } = req.body;

    if (!sender_user_name) {
        return res.status(400).json({
            success: false,
            message: "Provide senderName",
        })
    }

    if (!receiver_user_name) {
        return res.status(400).json({
            success: false,
            message: "Provide receiverUserName",
        })
    }

    const isSenderPresent = "SELECT * FROM `users` WHERE `userName` = ?";
    db.query(isSenderPresent, [sender_user_name], (err, data) => {
        if (err) {
            console.error("Error in query", err);
            return res.status(500).json({ success: false, message: "Database error while finding sender" });
        }

        if (data.length == 0) {
            return res.status(400).json({ success: false, message: "Sender Does not exists" });
        }
        else {
            const isReceiverPresent = "SELECT * FROM `users` WHERE `userName` = ?";
            db.query(isReceiverPresent, [receiver_user_name], (err, data) => {
                if (err) {
                    console.error("Error in query", err);
                    return res.status(500).json({ success: false, message: "Database error While finding Receiver" });
                }

                if (data.length == 0) {
                    return res.status(400).json({ success: false, message: "Receiver Does not exists" });
                }
                else {
                    const insertMessage = "INSERT INTO `messages`(`message_text`, `sender_user_name`, `receiver_user_name`) VALUES (?, ?, ?)";

                    db.query(insertMessage, [message_text, sender_user_name, receiver_user_name], (err, data) => {
                        if (err) {
                            console.error("Error in query", err);
                            return res.status(500).json({ success: false, message: "Database error While inserting message" });
                        }

                        // Now, fetch the newly created user message using LAST_INSERT_ID()
                        const getMessage = "SELECT * FROM `messages` WHERE `id` = LAST_INSERT_ID()";

                        db.query(getMessage, (err, newMessageData) => {
                            if (err) {
                                console.error("Error fetching new user", err);
                                return res.status(500).json({ success: false, message: "Error fetching created message" });
                            }

                            return res.status(201).json({ success: true, message: "User created successfully", message: newMessageData[0] });
                        });
                    });
                }
            });
        }
    });
});

router.post("/retrieveMessages", (req, res) => {
    const { senderUserName, receiverUserName } = req.body;

    if (!senderUserName) {
        return res.status(400).json({
            success: false,
            message: "Provide senderName",
        })
    }

    if (!receiverUserName) {
        return res.status(400).json({
            success: false,
            message: "Provide receiverUserName",
        })
    }

    const sql = "SELECT * FROM `messages` WHERE (`sender_user_name` = ? AND `receiver_user_name` = ?) OR (`sender_user_name` = ? AND `receiver_user_name` = ?);"
    db.query(sql, [senderUserName, receiverUserName,receiverUserName,senderUserName], (err, data) => {
        if (err) {
            console.log("error while retrieving the data", err);
            return res.status(500).json({
                success: false,
                message: "Error in retrieving the data"
            })
        }
        else {
            return res.status(200).json({
                success: true,
                message: "data fetched successfully",
                data: data
            })
        }
    })
})


router.post("/allUsers",(req,res)=>{

    const query = "SELECT * FROM `users` WHERE 1";
    db.query(query,(err,data)=>{
        if(err){
            return res.status(400).json({
                success:false,
                message:"Error in fetching all users",
            })
        }
        else{
            return res.status(200).json({
                success:true,
                message:"All users fetched successfully",
                users:data,
            })
        }
    })
})

module.exports = router;