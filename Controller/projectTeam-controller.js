const ProjectTeamModel = require("../Model/projectTeam-model")
const UserModel = require("../Model/user-model")

//add data to table
module.exports.addProjectTeamMember=function (req,res){
    const projectTeamMember= req.body.projectTeamMember
    const projectId  = req.body.projectId
    const role = req.body.role 
    const projectTeamstatus = true
    
    let ProjectTeam = new ProjectTeamModel({
        projectTeamMember:projectTeamMember,
        projectId:projectId,
        role: role,
        projectTeamStatus:projectTeamstatus
    })
    ProjectTeam.save(function(err,success){
        if(err){
            //console.log(err);
            res.json({msg:"Something Wrong",status:-1,data:req.body})        
        }
        else {
            UserModel.updateOne({_id:projectTeamMember},{projectAssigned:true},function(err,data){
                if (err) {
                    // console.log(err);
                    res.json({ msg: "Something Wrong", status: -1, data: req.body })
                }
                else{
                    res.json({ msg: "Project Member Added", status: 200, data: success })
                } 
            })
           
        }
    })
}
//list
module.exports.getAllProjectMember = function(req,res){
    let projectID = req.params.project
    //console.log(projectID);
    ProjectTeamModel.find({ projectId: projectID }).populate("projectId").populate("projectTeamMember").populate("role").exec(function (err, roles) {
        if(err){
            res.json({msg:"Something Wrong",status:-1,data:req.body})
        }
        else{
            res.json({msg:"Data Retraive",status:200,data:roles})
        }
    })
}
//delete
module.exports.deleteProjectTeamMember = function(req,res){
    let projectTeamId = req.params.projectTeamId
    let projectMember = req.body.projectMember
    ProjectTeamModel.deleteOne({_id:projectTeamId},{projectMember:projectMember},function(err,data) {
        if(err){
            res.json({msg:"Something Wrong",status:-1,data:req.body})
        }
        else{
            res.json({msg:"Delete Successfully",status:200,data:data})
        }
    })
}

//Disable user for project
module.exports.disableUserForProject = function (req, res) {
    let userId = req.params.user
    console.log(userId);
    ProjectTeamModel.findOne({ _id: userId }, function (err, data) {
        if (err) {
            res.json({ msg: "Something Wrong", status: -1, data: req.body })
        }
        else {
            //console.log(data.projectTeamStatus);
            if (data.projectTeamStatus == true) {
                ProjectTeamModel.updateOne({ _id: userId }, { projectTeamStatus: false }, function (err, data1) {
                    res.json({ msg: "Revoke Successfully", status: 200, data: data })
                    //console.log(data1.projectTeamStatus);
                })
            }
            else if (data.projectTeamStatus == false) {
                ProjectTeamModel.updateOne({ _id: userId }, { projectTeamStatus: true }, function (err, data) {
                    res.json({ msg: "Activated Successfully", status: 200, data: data })
                })
            }
            else {
                res.json({ msg: "Something Wrong", status: -1, data: req.body })
            }
        }
    })
}
//update
/*module.exports.updateprojectTeam = function(req,res){
    let projectTeamId = req.body.projectTeamId

    ProjectTeamModel.updateOne({_id:projectTeamId},function(err,data){
        if(err){
            res.json({msg:"Something Wrong",status:-1,data:req.body})
        }
        else{
            res.json({msg:"Data Updated",status:200,data:data})
        }
    })
}*/


module.exports.getProjectforDev = function (req, res) {
    let devIdParam = req.params.devId

    ProjectTeamModel.find({ projectTeamMember: devIdParam }).populate("projectId").exec(function (err, project) {
        if (err) {
            res.json({ msg: "Something Wrong", status: -1, data: err })
        }
        else {
            res.json({ msg: "Data Retraive", status: 200, data: project })
        }
    })
}


module.exports.getTesterbyProject = function (req, res) {
    let projectId = req.params.projectId

    ProjectTeamModel.find({ projectId: projectId,role:"624bc4f7c9105fb13a944f23" }).populate("projectTeamMember").exec(function (err, project) {
        if (err) {
            res.json({ msg: "Something Wrong", status: -1, data: err })
        }
        else {
            res.json({ msg: "Data Retraive", status: 200, data: project })
        }
    })
}