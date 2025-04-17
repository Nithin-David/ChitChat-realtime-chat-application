import express from 'express';
import dotenv from "dotenv";
import authRoutes from "./routers/auth.route.js";
import messageRoutes from "./routers/message.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from './lib/socket.js';

import path from 'path';

dotenv.config();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();


app.use(express.json({ limit: "10mb" }));

app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))
 
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
    })
}

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})