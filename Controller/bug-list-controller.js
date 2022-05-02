const BugListModel = require("../Model/bug-list-model")


//add [ POST ]
module.exports.addBugList = function (req, res) {

    let bugName = req.body.bugName
    let description = req.body.description
    let risk=req.body.risk

    let bug = new BugListModel({
        bugName: bugName,
        description: description,
        risk:risk
    })

    bug.save(function (err, data) {
        if (err) {
            res.json({ msg: "Something Wrong", data: err, status: -1 })//-1  [ 302 404 500 ]
        } else {
            res.json({ msg: "Bug added", data: data, status: 200 })//http status code 
        }
    })


}
//list
module.exports.getAllBug = function (req, res) {

    BugListModel.find(function (err, data) {
        if (err) {
            res.json({ msg: "Somthing went wrong", data:err, status: -1 })//-1  [ 302 404 500 ]
        } else {
            res.json({ msg: "bug ret...", data: data, status: 200 })//http status code 
        }
    })
}

//delete
module.exports.deleteBug = function(req,res){
    //params userid 
    let bugId = req.params.bugId //postman -> userid 
console.log(bugId);
    BugListModel.deleteOne({_id:bugId},function (err, data) {
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
    let risk=req.body.risk
    //console.log(bugId);
    BugListModel.updateOne({_id:bugId},{bugName:bugName,description:description,risk:risk},function (err, data) {
        if (err) {
            res.json({ msg: "Somthing went wrong", data: err, status: -1 })//-1  [ 302 404 500 ]
        } else {
            res.json({ msg: "Bug Updated", data: data, status: 200 })//http status code 
        }
    })
}
module.exports.getBugbyId= function (req, res) {
    let bugId = req.params.bugId    
    BugListModel.find({_id:bugId},function (err, data) {
        if (err) {
            res.json({ msg: "Somthing went wrong", data:err, status: -1 })//-1  [ 302 404 500 ]
        } else {
            res.json({ msg: "bug ret...", data: data, status: 200 })//http status code 
        }
    })
}