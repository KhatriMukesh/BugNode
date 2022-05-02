const mongoose = require("mongoose")

let TaskUserSchema = new mongoose.Schema({
taskId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"task"
    },
taskUser:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
},
moduleId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Module"
},
projectId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "project"
},
status: {
    type: String
}
})
//modal
const TaskUserModel = mongoose.model("taskUser",TaskUserSchema)
module.exports = TaskUserModel;