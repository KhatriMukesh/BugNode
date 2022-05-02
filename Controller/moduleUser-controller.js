const ModuleModel = require("../Model/module-model")
const ModuleUserModel = require("../Model/moduleUser-model")

//add data to table
module.exports.addModuleUser = function (req, res) {
    const moduleUser = req.body.moduleUser
    const moduleId = req.body.moduleId

    let ModuleUser = new ModuleUserModel({
        moduleUser: moduleUser,
        moduleId: moduleId
    })
    ModuleUser.save(function (err, success) {
        if (err) {
            // console.log(err);
            res.json({ msg: "Something Wrong", status: -1, data: req.body })
        }
        else {
            ModuleModel.updateOne({ _id: moduleId }, { assigned: true },function (err, success) {
                res.json({ msg: "Module Assigned", status: 200, data: success })
            })
        }
    })
}
//list
module.exports.getAllModuleUser = function (req, res) {
    let userId = req.params.projectManagerId

    ModuleUserModel.find({ moduleUser: userId }).populate("moduleId").exec(function (err, roles) {
        if (err) {
            res.json({ msg: "Something Wrong", status: -1, data: req.body })
        }
        else {
            res.json({ msg: "Data Retraive", status: 200, data: roles })
        }
    })
}
module.exports.deleteModules = function (req, res) {
    
    let moduleId = req.params.moduleId //postman -> userid 
   // console.log(moduleId);
    ModuleUserModel.deleteOne({ moduleId: moduleId }, function (err, data) {
        if (err) {
            res.json({ msg: "Somthing went wrong", data: err, status: -1 })//-1  [ 302 404 500 ]
        } else {
            ModuleModel.updateOne({ _id: moduleId }, { assigned: false },function (err, success) {
                res.json({ msg: "Deleted...", data: data, status: 200 })
            }) 
        }
    })
}
module.exports.getModulebyProjectManager = function (req, res) {
    let userId = req.params.projectManagerId
    // console.log(userId);
    ModuleUserModel.find({ moduleUser: userId }).populate("moduleId").exec(function (err, tasks) {
        if (err) {
            res.json({ msg: "Something Wrong", status: -1, data: req.body })
        }
        else {
            //console.log(tasks);
            res.json({ msg: "Data Retraive", status: 200, data: tasks })
        }
    })
}