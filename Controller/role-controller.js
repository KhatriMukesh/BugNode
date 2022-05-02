const { status }  = require("express/lib/response");
const RoleModel = require("../Model/role-model")


//add data to table
module.exports.addRole=function addRole(req,res){
    console.log(req.body.roleName);
    let role = new RoleModel({
        roleName:req.body.roleName,
        isActive:1
    })
    role.save(function(err,success){
        if(err){
            console.log(err);
            res.json({msg:"Something Wrong",status:-1,data:req.body})        
        }
        else{
            res.json({msg:"Role added",status:200,data:success})
        }
    })
}
//list All Data from table
module.exports.getAllRoles = function(req,res){
    RoleModel.find(function(err,roles){
        if(err){
            res.json({msg:"Something Wrong",status:-1,data:req.body})
        }
        else{
            res.json({msg:"Data Retraive",status:200,data:roles})
        }
    })
}
//delete data from table
module.exports.deleteRoles = function(req,res){
    let roleId = req.params.roleId
    RoleModel.deleteOne({_id:roleId},function(err,data) {
        if(err){
            res.json({msg:"Something Wrong",status:-1,data:req.body})
        }
        else{
            res.json({msg:"Data Retraive",status:200,data:data})
        }
    })
}
//upadte data from table
module.exports.updateRole = function(req,res){
    let roleId = req.body.roleId
    let roleName = req.body.roleName
    //let isActive = req.body.isActive

    RoleModel.updateOne({_id:roleId},{roleName:roleName},function(err,data){
        if(err){
            res.json({msg:"Something Wrong",status:-1,data:req.body})
        }
        else{
            res.json({msg:"Data Updated",status:200,data:data})
        }
    })
}
module.exports.getRoleById = function (req, res) {
    let roleId = req.params.roleId
    RoleModel.findOne({ _id: roleId }, function (err, data) {
        if (err) {
            res.json({ msg: "Something Wrong", status: -1, data: err })
        }
        else {
            res.json({ msg: "Data Retraive", status: 200, data: data })
        }
    })
}
module.exports.getRoles = function (req, res) {
    RoleModel.find(function (err, roles) {
        if (err) {
            res.json({ msg: "Something Wrong!", status: -1, data: req.body })
        }
        else {
            if (roles._id == "62473b64ff3a1f2757fd9ce3" || roles._id == "624bc4f7c9105fb13a944f23") {
                res.json({ msg: "Roles Retraive", status: 200, data: roles })
                console.log(roles)
            }
            else {
                res.json({ msg: "Something Wrong!", status: -1, data: req.body })
            }
        }
    })
}

module.exports.roleStatus = function (req, res) {
    let roleId = req.params.roleId
    RoleModel.findOne({ _id: roleId }, function (err, data) {
        if (err) {
            res.json({ msg: "Something Wrong", status: -1, data: req.body })
        }
        else {
            if (data.isActive == true) {
                RoleModel.updateOne({ _id: roleId }, { isActive: false }, function (err, data1) {
                    res.json({ msg: "Role Disabled", status: 200, data: data })
                })
            }
            else if (data.isActive == false) {
                RoleModel.updateOne({ _id: roleId }, { isActive: true }, function (err, data) {
                    res.json({ msg: "Activated Successfully", status: 200, data: data })
                })
            }
            else {
                res.json({ msg: "Something Wrong", status: -1, data: req.body })
            }
        }
    })
}