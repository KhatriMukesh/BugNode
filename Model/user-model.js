const mongoose = require("mongoose")

let UserSchema = new mongoose.Schema({
    firstName: {
        type:String,
        require:true
    },
    email: {
        type:String,
        require:true
    },
    gender: {
        type:String,
        required:true   
    },
    contactNumber: {
        type:String,
        required:true
    },
    password: {
        type:String,
        require:true
    },
    role : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"role"
    },
    isActive:{
        type:Boolean
    },
    OTP:{
        type:String
    },status:{
        type:String
    },
    projectAssigned:{
        type:Boolean
    },
    activeProject:{
        type:Boolean
    }
})

const UserModel = mongoose.model("user",UserSchema)
module.exports = UserModel