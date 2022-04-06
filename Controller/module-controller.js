const ModuleModel = require("../model/module-model")


//add [ POST ]
module.exports.addModule = function (req, res) {

    let moduleName = req.body.moduleName
    let description = req.body.description
    let estimatedTime = req.body.estimatedTime
    let startDate = req.body.startDate
    let priorityId = req.body.priorityId
    let projectId= req.body.projectId
    let statusId = "624c8bfd796acdf5207e1e50"

    let module = new ModuleModel({
        moduleName: moduleName,
        description: description,
        estimatedTime: estimatedTime,
        startDate: startDate,
        priorityId :priorityId,
        projectId:projectId,
        statusId:statusId
    })

    module.save(function (err, data) {
        if (err) {
            res.json({ msg: "something wrong", data: err, status: -1 })//-1  [ 302 404 500 ]
        } else {
            res.json({ msg: "module Added", data: data, status: 200 })//http status code 
        }
    })


}
//list
module.exports.getAllmodule = function (req, res) {

    ModuleModel.find().populate("priorityId").populate("projectId").populate("statusId").exec(function (err, data) {
        if (err) {
            res.json({ msg: "Somthing wrong", data: err, status: -1 })//-1  [ 302 404 500 ]
        } else {
            res.json({ msg: "module ret...", data: data, status: 200 })//http status code 
        }
    })
}

//delete
module.exports.deleteModule = function(req,res){
    //params userid 
    let moduleId = req.params.moduleId //postman -> userid 

    ModuleModel.deleteOne({_id:moduleId},function (err, data) {
        if (err) {
            res.json({ msg: "Somthing went wrong", data: err, status: -1 })//-1  [ 302 404 500 ]
        } else {
            res.json({ msg: "delete...", data: data, status: 200 })//http status code 
        }
    })
}


//update 
module.exports.updateModule = function(req,res){
    //params userid 
    let moduleId = req.body.moduleId //postman -> userid 
    let moduleName = req.body.moduleName
    let description=req.body.description
    let estimatedTime =  req.body.estimatedTime
    let priorityId= req.body.priorityId
    ModuleModel.updateOne({_id:moduleId},{moduleName:moduleName,description:description,estimatedTime: estimatedTime, priorityId: priorityId},function (err, data) {
        if (err) {
            res.json({ msg: "Somthing went wrong", data: err, status: -1 })//-1  [ 302 404 500 ]
        } else {
            res.json({ msg: "module update...", data: data, status: 200 })//http status code 
        }
    })
}
module.exports.getModuleById = function (req, res) {
    let moduleId = req.params.moduleId
    ModuleModel.findOne({ _id: moduleId }).populate("projectId").populate("priorityId").exec(function (err, data) {
        if (err) {
            res.json({ msg: "Something Wrong", status: -1, data: err })
        }
        else {
            res.json({ msg: "Data Retraive", status: 200, data: data })
        }
    })
}
module.exports.getModulebyproject = function (req, res) {
    let projectId = req.params.project
    console.log(projectId)
    ModuleModel.find({ projectId: projectId }).populate("projectId").exec(function (err, data) {
        if (err) {
            res.json({ msg: "Something Wrong", status: -1, data: err })
        }
        else {
            res.json({ msg: "Data Retraive", status: 200, data: data })
        }
    })
}