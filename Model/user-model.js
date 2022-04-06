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
        type:Number
    }
})

const UserModel = mongoose.model("user",UserSchema)
module.exports = UserModel