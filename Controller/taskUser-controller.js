const TaskUserModel = require("../Model/taskUser-model")
const TaskModel = require("../Model/task-model")

//add data to table
module.exports.addTaskUser=function (req,res){
    const taskUser = req.body.taskUser
    const taskId = req.body.taskId
    const projectId = req.body.projectId
    const moduleId = req.body.moduleId
    const status = "Pending"

    let TaskUser = new TaskUserModel({
        taskUser: taskUser,
        taskId: taskId,
        moduleId: moduleId,
        projectId: projectId,
        status: status
    })
    TaskUser.save(function(err,success){
        if(err){
            console.log(err);
            res.json({msg:"Something Wrong",status:-1,data:req.body})        
        }
        else{
            TaskModel.updateOne({ _id: taskId }, { assigned: true }, function (err, success) {
                res.json({ msg: "Task Assigned", status: 200, data: success })
            })
        }
    })
}
//list
module.exports.getAllTaskUser = function(req,res){
    TaskUserModel.find().populate("taskUser").populate("taskId").exec(function (err, roles) {
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

module.exports.getTaskbyDevelop = function (req, res) {
    let userId = req.body.devId
    // let statusId = req.body.statusId
    //console.log(userId);
    TaskUserModel.find({ taskUser: userId }).populate("taskId").populate("taskUser").populate("projectId").populate("moduleId").exec(function (err, tasks) {
        if (err) {
            res.json({ msg: "Something Wrong", status: -1, data: req.body })
        }
        else {
            //console.log(tasks);
            res.json({ msg: "Data Retraive", status: 200, data: tasks })
        }
    })
}
module.exports.getPendingTaskforDev = function (req, res) {
    let devId = req.params.devId
    TaskUserModel.find({ taskUser: devId,status:"Pending" }).populate("taskId").populate("projectId").populate("moduleId").exec(function (err, tasks) {
        if (err) {
            res.json({ msg: "Something Wrong", status: -1, data: req.body })
        }
        else {
            //console.log(tasks);
            res.json({ msg: "Data Retraive", status: 200, data: tasks })
        }
    })
}
module.exports.getTaskbyProjectforDev = function (req, res) {
    let devId = req.body.devId
    let projectId = req.body.projectId
    //console.log(devId);
    //console.log(projectId);
    TaskUserModel.find({ taskUser: devId, projectId: projectId,status:"Pending" }).populate("taskId").populate("projectId").populate("moduleId").exec(function (err, tasks) {
        if (err) {
            res.json({ msg: "Something Wrong", status: -1, data: req.body })
        }
        else {
            //console.log(tasks);
            res.json({ msg: "Data Retraive", status: 200, data: tasks })
        }
    })
}

module.exports.submitTask = function (req, res) {
    let taskId = req.body.taskId
    // let projectId = req.body.projectId
    // let moduleId = req.body.moduleId
    let testerId = req.body.testerId
    let time = req.body.time
    let developerId = req.body.developerId
    
    TaskUserModel.find({ taskUser: taskId, taskId: taskId }, function (err, tasks) {
        if (err) {
            res.json({ msg: "Something Wrong", status: -1, data: req.body })
        }
        else {
            TaskUserModel.updateOne({ taskId: taskId }, { status: "Completed" }, function (err, success) {
                if (err) {
                    res.json({ msg: "Something Wrong!", status: -1, data: err })
                }
                else {
                    TaskModel.updateOne({ _id: taskId }, { developerId:developerId,testerId:testerId,statusId:"622b55f8f4370ecb2982e486",completionTime:time }, function (err, success) {
                        if (err) {
                            res.json({ msg: "Something Wrong!", status: -1, data: err })
                        }
                    })
                    res.json({ msg: "Task Completed", status: 200, data: tasks })
                }
            })
        }
    })
}