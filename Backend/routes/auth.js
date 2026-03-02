import express from "express";
import user from "../models/User.js";
import {protect} from "../middleware/auth.js";
import jwt from "jsonwebtoken"; // library that creztes and verifies JSON Web Tokens (JWTs) for authentication and authorization purposes
//Register route

const router= express.Router(); // to create a router object to handle the routes related to authentication
router.post('/register', async (req,res)=>{
    const {username, email, password} = req.body; // to get the username, email and password from the request body(destructure)
   try{
    if(!username || !email || !password){ // to check if the username, email and password are provided or not   
        return res.status(400).json({message: "Please fill all the fields"});
    }
    const userExists = await user.findOne({email}); // to check if the user already exists or not by finding the user with the email in the database
    if(userExists){
        return res.status(400).json({message: "User already exists"});
    }  
    const user= await user.create({ // to create a new user in the database with the provided username, email and password
        username,
        email,  
        password
    });
           const token = generateToken(user._id) // to generate a JWT token for the user with the provided id

    res.status(201).json({id: user._id, username: user.username, email: user.email,token}); // to send a response with the status code 201 and a message and the user object

   } catch(err){ 
        return res.status(500).json({message: "Internal server error"});
}
})

//Login route
router.post('/login', async (req,res)=>{
    const {email, password} = req.body; // to get the email and password from the request body(destructure)
   try{
    if(!email || !password){ // to check if the email and password are provided or not      
        return res.status(400).json({message: "Please fill all the fields"});
    }
    const userExists = await user.findOne({email}); // to check if the user already exists or not by finding the user with the email in the database
    if(!userExists || !(await userExists.matchPassword(password))){ // to check if the user exists and if the password is correct or not by using the matchPassword method in the user model
        return res.status(401).json({message: "Invalid credentials"});
    }  
    const token = generateToken(user._id)
    res.status(200).json({id: userExists._id, username: userExists.username, email: userExists.email,token}); // to send a response with the status code 200 and a message and the user object
   } catch(err){
        return res.status(500).json({message: "Internal server error"});
}       
})
//Profile route
router.get('/profile',protect, async (req,res)=>{ // this function gives us access to the currently logged in user user
    res.status(200).json(req.user); // to send a response with the status code 200 and the user object that is stored in the request object by the authentication middleware
}) 

//generate jwt token
const generateToken = (id) => { // to generate a JWT token for the user with the provided id
    return jwt.sign({id}, process.env.JWT_SECRET, { // to sign the token with the user id and the secret key that is stored in the environment variable and to set the expiration time for the token
        expiresIn: "30d", // to set the expiration time for the token to 30 days
    }); // we use the generatetoken function  whenever the user logs in or registers
}
export default router;