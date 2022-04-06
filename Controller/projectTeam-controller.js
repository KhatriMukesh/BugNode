const ProjectTeamModel = require("../Model/projectTeam-model")

//add data to table
module.exports.addProjectTeamMember=function (req,res){
    const projectTeamMember= req.body.projectTeamMember
    const projectId  = req.body.projectId 
    const projectTeamstatus = req.body.projectTeamStatus
    
    let ProjectTeam = new ProjectTeamModel({
        projectTeamMember:projectTeamMember,
        projectId:projectId,
        projectTeamStatus:projectTeamstatus
    })
    ProjectTeam.save(function(err,success){
        if(err){
            console.log(err);
            res.json({msg:"Something Wrong",status:-1,data:req.body})        
        }
        else{
            res.json({msg:"ProjectMember added",status:200,data:success})
        }
    })
}
//list
module.exports.getAllProjectMember = function(req,res){
    ProjectTeamModel.find(function(err,roles){
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
