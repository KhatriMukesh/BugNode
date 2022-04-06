const mongoose = require("mongoose")


let BugSchema = new mongoose.Schema({
    
        bugName:{
            type:String,
            required:true
        },
        description:{
            type:String
        },
        taskId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"task"
        },
        priorityId : {
                type:mongoose.Schema.Types.ObjectId,
                ref:"priority"
        },
        testerId : {
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        },
        statusId : {
            type:mongoose.Schema.Types.ObjectId,
            ref:"status"
        },
        developerId : {
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        }
})


const BugModel = mongoose.model("bug",BugSchema)
module.exports = BugModel