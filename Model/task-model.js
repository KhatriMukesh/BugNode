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
            type:Date
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
            ref:"module"
        },
        statusId : {
            type:mongoose.Schema.Types.ObjectId,
            ref:"status"
}
})


const TaskModel = mongoose.model("task",TaskSchema)
module.exports = TaskModel