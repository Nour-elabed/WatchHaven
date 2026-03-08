import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,  // to make sure that the password is always hashed before saving to the database and also to have a method to compare the entered password with the hashed password in the database
    }

}, { timestamps: true });// to have createdAt and updatedAt fields

userSchema.pre("save", async function() {
    if (!this.isModified("password")) return; // to check if the password is modified or not, if not then return and do not hash the password again
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});
userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);// to compare the entered password with the hashed password in the database
} // hashing the password inside the model to make sure that the password is always hashed before saving to the database and also to have a method to compare the entered password with the hashed password in the database
const User= mongoose.model("User", userSchema);
export default User;