const BugStatusModel = require("../model/bug-status-model")


//add [ POST ]
module.exports.addBugStatus = function (req, res) {

    let statusName = req.body.bugStatusName

    let bugStatus = new BugStatusModel({
        statusName: statusName
    })

    bugStatus.save(function (err, data) {
        if (err) {
            res.json({ msg: "Something Wrong", data: err, status: -1 })
        } else {
            res.json({ msg: "Status added", data: data, status: 200 }) 
        }
    })


}
//list
module.exports.getAllBugStatus = function (req, res) {

    BugStatusModel.find(function (err, data) {
        if (err) {
            res.json({ msg: "Somthing went wrong", data:err, status: -1 })//-1  [ 302 404 500 ]
        } else {
            res.json({ msg: "Status retraive", data: data, status: 200 })//http status code 
        }
    })
}

module.exports.getStatusName = function (req, res) {
    let statusId = req.params.statusId
    //console.log(statusId);
    BugStatusModel.find({_id:statusId},function (err, data) {
        if (err) {
            res.json({ msg: "Somthing went wrong", data: err, status: -1 })//-1  [ 302 404 500 ]
        } else {
            res.json({ msg: "Status retraive", data: data, status: 200 })//http status code 
        }
    })
}
