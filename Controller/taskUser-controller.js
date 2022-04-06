const TaskUserModel = require("../Model/taskUser-model")
const taskUserModel = require("../Model/taskUser-model")

//add data to table
module.exports.addTaskUser=function (req,res){
    const taskUser= req.body.taskUser
    const taskId  = req.body.taskId 
    
    let TaskUser = new taskUserModel({
        taskUser:taskUser,
        taskId:taskId
    })
    TaskUser.save(function(err,success){
        if(err){
            console.log(err);
            res.json({msg:"Something Wrong",status:-1,data:req.body})        
        }
        else{
            res.json({msg:"User added",status:200,data:success})
        }
    })
}
//list
module.exports.getAllTaskUser = function(req,res){
    TaskUserModel.find(function(err,roles){
        if(err){
            res.json({msg:"Something Wrong",status:-1,data:req.body})
        }
        else{
            res.json({msg:"Data Retraive",status:200,data:roles})
        }
    })
}
//delete
module.exports.deleteTaskUser = function(req,res){
    let taskUser = req.params.taskUser
    let taskId = req.body.taskId
    TaskUserModel.deleteOne({_id:TaskUserId},{taskUser:taskUser},{taskId:taskId},function(err,data) {
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
