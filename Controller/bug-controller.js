const BugModel = require("../model/bug-model")
const TaskModel =require("../Model/task-model")
const TaskUserModel = require("../Model/taskUser-model")

//add [ POST ]
module.exports.addBug = function (req, res) {

    let bugName = req.body.bugName
    let taskId = req.body.taskId
    let developerId = req.body.developerId
    let testerId = req.body.testerId

    let bug = new BugModel({
        bugName: bugName,
        testerId: testerId,
        taskId: taskId,
        developerId: developerId
    })



    bug.save(function (err, data) {
        if (err) {
            res.json({ msg: "Something Wrong", data: err, status: -1 })//-1  [ 302 404 500 ]
        } else {
            TaskUserModel.updateOne({ taskId: taskId, TaskUser: developerId }, { status: "Pending" }, function (err, success) {
                if (err) {
                    res.json({ msg: "Something Wrong", data: err, status: -1 })//-1  [ 302 404 500 ]
                } else {
                    TaskModel.updateOne({ _id: taskId }, { bugStatus: "625030ca592b3cd09e3a96df" }, function (err, success) {
                        if (err) {
                            res.json({ msg: "Something Wrong", data: err, status: -1 })//-1  [ 302 404 500 ]
                        } else {
                            res.json({ msg: "Bug added", data: success, status: 200 })
                        }
                    })
                }
            })
        }
    })



}
//list
module.exports.getAllBug = function (req, res) {

    BugModel.find().populate("taskId").populate("priorityId").populate("statusId").exec(function (err, data) {
        if (err) {
            res.json({ msg: "Somthing went wrong", data: err, status: -1 })//-1  [ 302 404 500 ]
        } else {
            res.json({ msg: "bug ret...", data: data, status: 200 })//http status code 
        }
    })
}

//delete
module.exports.deleteBug = function(req,res){
    //params userid 
    let bugId = req.params.bugId //postman -> userid 

    BugModel.deleteOne({_id:bugId},function (err, data) {
        if (err) {
            res.json({ msg: "Somthing went wrong", data: err, status: -1 })//-1  [ 302 404 500 ]
        } else {
            res.json({ msg: "delete...", data: data, status: 200 })//http status code 
        }
    })
}


//update 
module.exports.updateBug= function(req,res){
    //params userid 
    let bugId = req.body.bugId //postman -> userid 
    let bugName = req.body.bugName
    let description=req.body.description
    BugModel.updateOne({_id:bugId},{bugName:bugName},{description:description},function (err, data) {
        if (err) {
            res.json({ msg: "Somthing went wrong", data: err, status: -1 })//-1  [ 302 404 500 ]
        } else {
            res.json({ msg: "bug update...", data: data, status: 200 })//http status code 
        }
    })
}

module.exports.getBugforTester = function (req, res) {
    let testerId = req.params.testerId
    BugModel.find({ testerId: testerId }).populate("taskId").populate("developerId").populate("testerId").populate("bugName").exec(function (err, data) {
        if (err) {
            res.json({ msg: "Somthing went wrong", data: err, status: -1 })//-1  [ 302 404 500 ]
        } else {
            res.json({ msg: "Data Retraive!", data: data, status: 200 })//http status code 
        }
    })
}

module.exports.getbugTaskforDev = function (req, res) {
    let devId = req.params.devId
    BugModel.find({ developerId: devId }).populate("taskId").populate("developerId").populate("testerId").populate("bugName").exec(function (err, data) {
        if (err) {
            res.json({ msg: "Somthing went wrong", data: err, status: -1 })//-1  [ 302 404 500 ]
        } else {
            res.json({ msg: "Data Retraive!", data: data, status: 200 })//http status code 
        }
    })
}