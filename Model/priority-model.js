const mongoose = require("mongoose")

let PrioritySchema = new mongoose.Schema({
priorityName:{
    type:String
    },
isActive:{
    type:Boolean
    }
})
//modal
const PriorityModel = mongoose.model("priority",PrioritySchema)
module.exports = PriorityModel;