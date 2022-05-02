const mongoose = require("mongoose")

let ProjectSchema = new mongoose.Schema({
projectTitle:{
    type:String
    },
projectManagerID:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
},
description:{
    type:String
},
technology:{
    type:String
},
estimatedHours:{
    type:String
},
startDate:{
    type:String
},
complitionHours:{
    type:String
},
statusId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"status"
}
})
//modal
const ProjectModel = mongoose.model("project",ProjectSchema)
module.exports = ProjectModel;