import { connectDB } from "./config/db.js";
import express from 'express';
import dotenv from 'dotenv';
import authRoutes from "./routes/auth.js";
dotenv.config();// to have access to the variable inside .env file
const PORT= process.env.PORT || 5000; // in case of error we will time 5000 manually
const app= express() 
app.use(express.json()); // to parse the incoming request body as JSON data and to make it available in the req.body object in the route handlers

app.use("/api/users" ,authRoutes); // to use the auth routes for the routes that start with /api/users)
connectDB();
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})