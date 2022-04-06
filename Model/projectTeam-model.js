const mongoose = require("mongoose")

let ProjectTeamSchema = new mongoose.Schema({
projectId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"project"
    },
projectTeamMember:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
},
projectTeamStatus:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"status"
}
})
//modal
const ProjectTeamModel = mongoose.model("projectTeam",ProjectTeamSchema)
module.exports = ProjectTeamModel;