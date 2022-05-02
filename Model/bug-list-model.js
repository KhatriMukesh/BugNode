const mongoose = require("mongoose")


let BugListSchema = new mongoose.Schema({
    
        bugName:{
            type:String,
            required:true
        },
        description:{
            type:String
        },
        risk:{
            type:String
        }
})


const BugListModel = mongoose.model("bugList",BugListSchema)
module.exports = BugListModel