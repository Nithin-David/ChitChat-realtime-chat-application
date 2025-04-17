import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({error: "Unauthorized, No token provided"});
        };

        const verified = jwt.verify(token, process.env.SECRET_KEY);

        if(!verified){
            return res.status(401).json({error: "Unauthorized, Invalid token"});
        };

        const user = await User.findById(verified.userId).select("-password");

        if(!user){
            return res.status(401).json({error: "Unauthorized, User not found"});
        };

        req.user = user;

        next();

    } catch (error) {
        console.log("Error in protectedRoute middleware", error.message);
        return res.status(400).json({ error: "Internal Server Error" });
        
    }
}