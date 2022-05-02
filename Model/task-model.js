const mongoose = require("mongoose")


let TaskSchema = new mongoose.Schema({
    
        taskName:{
            type:String,
            required:true
        },
        description:{
            type:String
        },
        totalTime:{
            type:String
        },
        startDate:{
            type:String
        },
        projectId:{
            type:mongoose.Schema.Types.ObjectId,
                ref:"project"
        },
        priorityId : {
                type:mongoose.Schema.Types.ObjectId,
                ref:"priority"
        },
        moduleId : {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Module"
        },
        statusId : {
            type:mongoose.Schema.Types.ObjectId,
            ref:"status"
        },
        assigned:{
            type:Boolean
        },
        developerId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        testerId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        completionTime:{
            type:String
        },
        bugStatus:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "bugStatus"
        }
})


const TaskModel = mongoose.model("task",TaskSchema)
module.exports = TaskModel
