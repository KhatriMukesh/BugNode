const PriorityModel = require("../Model/priority-model")

//add data to table
module.exports.addPriority=function (req,res){
    const priorityName = req.body.priorityName  
    let isActive = 1 
    
    let priority = new PriorityModel({
        priorityName:priorityName,
        isActive:isActive
    })
    priority.save(function(err,success){
        if(err){
            console.log(err);
            res.json({msg:"Something Wrong",status:-1,data:req.body})        
        }
        else{
            res.json({msg:"Priority added",status:200,data:success})
        }
    })
}
//list
module.exports.getAllPriority = function(req,res){
    PriorityModel.find(function(err,roles){
        if(err){
            res.json({msg:"Something Wrong",status:-1,data:req.body})
        }
        else{
            res.json({msg:"Data Retraive",status:200,data:roles})
        }
    })
}
//delete
module.exports.deletePriority = function(req,res){
    let priorityId = req.params.priorityId
    PriorityModel.deleteOne({_id:priorityId},function(err,data) {
        if(err){
            res.json({msg:"Something Wrong",status:-1,data:req.body})
        }
        else{
            res.json({msg:"Delete Successfully",status:200,data:data})
        }
    })
}
//update
module.exports.updatePriority = function(req,res){
    let priorityId = req.body.priorityId
    let priorityName = req.body.priorityName
    //let isActive = req.body.isActive

    PriorityModel.updateOne({_id:priorityId},{priorityName:priorityName},function(err,data){
        if(err){
            res.json({msg:"Something Wrong",status:-1,data:req.body})
        }
        else{
            res.json({msg:"Data Updated",status:200,data:data})
        }
    })
}
