const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require("./routes/usersRoutes");
const messageRoute = require("./routes/mesaagesRoute");
const { createServer } = require('http');

const app = express();
const socket = require('socket.io');
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoute);


mongoose.connect('mongodb+srv://mahakdeveloper0804:Mahak%40080204@cluster0.lpbdmkv.mongodb.net/chat_app',
                  { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));


// const server = app.listen(5000, () => {
//     console.log(`Server is started on PORT:5000`);
// });
const httpServer = createServer(app);
const io  = socket(server,{
    cors:{
        origin:"https://chat-application-lovat-ten.vercel.app",
        methods:["POST","GET"],
        credentials:true,
    }
});
global.onlineUsers = new Map();

io.on("connection", (socket) => {
    console.log('New WebSocket connection:', socket.id);

    socket.on("add-user", (userID) => {
        onlineUsers.set(userID, socket.id);
        console.log('User added:', userID);
    });

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.message);
            console.log('Message sent to:', data.to);
        }
    });

    socket.on("disconnect", () => {
        console.log('WebSocket disconnected:', socket.id);
    });
});

httpServer.listen(process.env.PORT, () => {
    console.log(`Server is started on PORT: ${process.env.PORT}`);
});
