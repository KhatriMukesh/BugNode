const StatusModel = require("../Model/status-model")

//add data to table
module.exports.addStatus=function (req,res){
    console.log(req.body.statusName);
    let statusName = req.body.statusName  
    let isActive = true
    
    let status = new StatusModel({
        statusName:statusName,
        isActive:isActive
    })
    console.log(statusName);
    status.save(function(err,success){
        if(err){
            console.log(err);
            res.json({msg:"Something Wrong",status:-1,data:req.body})        
        }
        else{
            res.json({msg:"Status added",status:200,data:success})
        }
    })
}
//list
module.exports.getAllStatus = function(req,res){
    StatusModel.find(function(err,roles){
        if(err){
            res.json({msg:"Something Wrong",status:-1,data:req.body})
        }
        else{
            res.json({msg:"Data Retraive",status:200,data:roles})
        }
    })
}
//delete
module.exports.deleteStatus = function(req,res){
    let statusId = req.params.statusId
    StatusModel.deleteOne({_id:statusId},function(err,data) {
        if(err){
            res.json({msg:"Something Wrong",status:-1,data:req.body})
        }
        else{
            res.json({msg:"Delete Successfully",status:200,data:data})
        }
    })
}
//update
module.exports.updateStatus = function(req,res){
    let statusId = req.body.statusId
    let statusName = req.body.statusName
    //let isActive = req.body.isActive

    StatusModel.updateOne({_id:statusId},{statusName:statusName},function(err,data){
        if(err){
            res.json({msg:"Something Wrong",status:-1,data:req.body})
        }
        else{
            res.json({msg:"Data Updated",status:200,data:data})
        }
    })
}
