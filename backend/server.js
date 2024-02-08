import express from "express";
import dotenv from "dotenv"
import { app, server } from "./socket/socket.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js"
import connectToMongoDB from "./db/connectToMongoDB.js";
import messageRouters from "./routes/message.routes.js"
import userRouters from "./routes/user.routes.js"
import path from "path";
const __dirname = path.resolve();
dotenv.config();

const PORT = process.env.PORT || 5000

app.use(express.json()); //to parse the incoming requests with Json payloads (from req.body)
app.use(cookieParser());
// app.get("/", (req, res) => {
//     res.send("Hello World");
// })
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRouters);
app.use("/api/users", userRouters);

app.use(express.static(path.join(__dirname, "/frontend/dist")))


app.get("*", (req, res) => {
    res.send(path.join(__dirname, "frontend", "dist", "index.html"));
})

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`server is running on ${PORT}`)
});