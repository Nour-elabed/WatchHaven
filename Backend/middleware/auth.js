import User from "../models/User.js";
import jwt from "jsonwebtoken"; // library that creztes and verifies JSON Web Tokens (JWTs) for authentication and authorization purposes
export const protect = async (req,res,next) => { // to protect the routes that require authentication by checking if the user is authenticated or not
    let token; // to store the token that is sent by the client in the request header
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){ // to check if the authorization header is present and if it starts with "Bearer" which is the standard for sending JWTs in the authorization header
       try {
        token= req.headers.authorization.split(" ")[1]; // to get the token from the authorization header by splitting the header value and getting the second part which is the token
       const decoded= jwt.verify(token,process.env.JWT_SECRET)
         req.user= await User.findById(decoded.id).select("-password"); // to get the user from the database using the id that is decoded from the token and to exclude the password field from the user object
    return next(); // to continue to the next route handler if the user is authenticated
        
       } catch (err) { // to catch any errors that occur during the token verification process and to return a 401 status code with a message indicating that the user is not authorized
            console.error("token verification error failed",err.message);
            return res.status(401).json({message:"Not authorized, token failed"});
       }
    }else {
       
        return res.status(401).json({ message: "Not authorized, no token" });
    }

} 
//authorization : Bearer <token> is the standard format for sending JWTs in the authorization header where "Bearer" is a keyword that indicates that the token is a bearer token and <token> is the actual JWT that is sent by the client in the request header
