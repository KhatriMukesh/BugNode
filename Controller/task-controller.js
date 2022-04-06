const TaskModel = require("../model/task-model")


//add [ POST ]
module.exports.addTask = function (req, res) {

    let taskName = req.body.taskName
    let description = req.body.description
    let totalTime = req.body.totalTime
    // let startDate = req.body.startDate
    let moduleId = req.body.moduleId
    let projectId= req.body.projectId
    let statusId = "624c8bfd796acdf5207e1e50"
    let priorityId = req.body.priorityId

    let task = new TaskModel({
        taskName: taskName,
        description: description,
        totalTime: totalTime,
        // startDate: startDate,
        projectId :projectId,
        moduleId:moduleId,
        statusId:statusId,
        priorityId:priorityId
    })



    task.save(function (err, data) {
        if (err) {
            res.json({ msg: "something wrong", data: err, status: -1 })//-1  [ 302 404 500 ]
        } else {
            res.json({ msg: "task added", data: data, status: 200 })//http status code 
        }
    })


}
//list
module.exports.getAllTask = function (req, res) {

    TaskModel.find().populate("moduleId").populate("statusId").populate("projectId").populate("priorityId").exec(function (err, data) {
        if (err) {
            res.json({ msg: "Somthing went wrong", data: err, status: -1 })//-1  [ 302 404 500 ]
        } else {
            res.json({ msg: "task ret...", data: data, status: 200 })//http status code 
        }
    })
}

//delete
module.exports.deleteTask = function(req,res){
    //params userid 
    let taskId = req.params.taskId //postman -> userid 

    TaskModel.deleteOne({_id:taskId},function (err, data) {
        if (err) {
            res.json({ msg: "Somthing went wrong", data: err, status: -1 })//-1  [ 302 404 500 ]
        } else {
            res.json({ msg: "delete...", data: data, status: 200 })//http status code 
        }
    })
}


//update 
module.exports.updateTask = function(req,res){
    //params userid 
    let taskId = req.body.taskId //postman -> userid 
    let taskName = req.body.taskName
    let description=req.body.description
    TaskModel.updateOne({_id:taskId},{taskName:taskName},{description:description},function (err, data) {
        if (err) {
            res.json({ msg: "Somthing went wrong", data: err, status: -1 })//-1  [ 302 404 500 ]
        } else {
            res.json({ msg: "task update...", data: data, status: 200 })//http status code 
        }
    })
}