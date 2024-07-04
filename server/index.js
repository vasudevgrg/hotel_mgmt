const express= require("express");
const app= express();
const hotelRoutes= require("./routes/hotel");
const travellerRoutes= require("./routes/traveller")
const LoginRoutes= require("./routes/login");
const cors= require("cors");
const cookieParser= require("cookie-parser");
const http = require('http');
const setupChatSocket = require('./sockets/chat');

const server = http.createServer(app);

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))

app.use("/hotel", hotelRoutes);
app.use("/traveller",travellerRoutes);
app.use("/",LoginRoutes);

setupChatSocket(server);

app.listen(5002, ()=>console.log("listening to 5002"))