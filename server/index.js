const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require("./routes/usersRoutes");
const messageRoute = require("./routes/mesaagesRoute");

const app = express();
const socket = require('socket.io');
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoute);


mongoose.connect('mongodb+srv://mahakdeveloper0804:Mahak%40080204@cluster0.lpbdmkv.mongodb.net/chat_app/'
);

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is started on PORT:${process.env.PORT}`);
});

const io  = socket(server,{
    cors:{
        origin:"https://chat-application-lovat-ten.vercel.app",
        credentials:true,
    }
});
global.onlineUsers = new Map();

io.on("connection", (socket)=>{
    global.chatSocket = socket;
    socket.on("add-user",(userID)=>{
        onlineUsers.set(userID,socket.id);
    });
    socket.on("send-msg",(data)=>{
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket)
            {
                socket.to(sendUserSocket).emit("msg-recieve",data.message);
            }
    });
})
