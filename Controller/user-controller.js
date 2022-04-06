const { status } = require("express/lib/response");
const UserModel = require("../Model/user-model");
const bcrypt = require("bcrypt")


//add user
module.exports.addUser = function(req,res){
    let firstName = req.body.firstName
    let email = req.body.email
    let password = req.body.password
    let role = req.body.role
    let gender = req.body.gender
    let contactNumber = req.body.contactNumber
    let isActive = false

    let encPassword = bcrypt.hashSync(password, 10)

    let user = new UserModel({
        firstName: firstName,
        email: email,
        password: encPassword,
        role: role,
        gender: gender,
        contactNumber: contactNumber,
        isActive : isActive
    })

    user.save(function(err,data){
        if(err){
            res.json({msg:"Something Wrong...",status:-1,data:req.body})
        }
        else{
            res.json({msg:"User Added Sucessfully",status:200,data:data})
        }
    })
}

//list user
module.exports.getAllUser = function(req,res){
    UserModel.find().populate("role").exec(function(err,data){
        if(err){
            res.json({msg:"Somethiing Wrong...",status:-1,data:req.body})
        }
        else{
            res.json({msg:"USer List",status:200,data:data})
        }

    })
}

//delete user
module.exports.deleteUser = function(req,res){
    let userId = req.params.userId
    UserModel.deleteOne({_id:userId},function(err,data){
        if(err){
            res.json({msg:"Somethiing Wrong...",status:-1,data:req.body})
        }else{
            res.json({msg:"User Deleted",status:200,data:data})
        }
    })
}

//uodate user data
module.exports.updateUser = function(req,res){
    let userId = req.body.userId
    let firstName = req.body.firstName
    //let password = req.body.password
    //let isActive = req.body.isActive

    UserModel.updateOne({_id:userId},{firstName:firstName},function(err,data){
        if(err){
            res.json({msg:"Somethiing Wrong...",status:-1,data:req.body})
        }else{
            res.json({msg:"Data Updated",status:200,data:data})
        }
    })
}
module.exports.getUserById = function(req,res){
    let userId = req.params.userId
    UserModel.findOne({_id:userId},function(err,success){
        if(err){
            res.json({msg:"Something Wrong",status:-1,data:req.body})
        }
        else{
            res.json({msg:"Data Retraive",status:200,data:success})
        }
    })
}
// module.exports.login = function(req,res){

//     let param_email = req.body.email
//     let param_password  = req.body.password 

//     let isCorrect = false

//     UserModel.findOne({email:param_email}).populate("role").exec(function(err,data){
//         if(data){
//             let ans =  bcrypt.compareSync(param_password,data.password)
//             if(ans == true){
//                     isCorrect = true
//             }
//         }
    
//         if (isCorrect == false) {
//             res.json({ msg: "Invalid Email/Password...", data: req.body, status: -1 })//-1  [ 302 404 500 ]
//         } else {
//             res.json({ msg: "Login....", data: data, status: 200 })//http status code 
//         }
//     })
// }
module.exports.login = function (req, res) {

    let param_email = req.body.email
    let param_password = req.body.password

    let isCorrect = false
    UserModel.findOne({ email: param_email }).populate("role").exec(function (err, data) {
        if (data.isActive == true) {
            let ans = bcrypt.compareSync(param_password, data.password)
            if (ans == true) {
                isCorrect = true
            }
        }
        else {
            res.json({ msg: "Admin Approval is Pending", data: req.body, status: -1 })
        }

        if (isCorrect == false) {
            res.json({ msg: "Invalid Email/Password...", data: req.body, status: -1 })
        } else {
            res.json({ msg: "Login....", data: data, status: 200 })//http status code 
        }
    })
}
module.exports.pendingusers = function (req, res) {
    UserModel.find({ isActive: false }).populate("role").exec(function (err, managers) {
        if (err) {
            res.json({ msg: "Something Wrong", status: -1, data: req.body })
        }
        else {
            res.json({ msg: "Data Retraive", status: 200, data: managers })
        }
    })
}
module.exports.approveUser = function (req, res) {
    let userId = req.body.userId
    //console.log(userId)
    UserModel.updateOne({ _id: userId }, { isActive: true, status: "Approved" }, function (err, managers) {
        if (err) {
            res.json({ msg: "Something Wrong", status: -1, data: req.body })
        }
        else {
            res.json({ msg: "User Approved", status: 200, data: managers })
        }
    })
}
module.exports.disableUser = function (req, res) {
    let userId = req.body.userId
    // console.log(userId);
    UserModel.updateOne({ _id: userId }, { isActive: false, status: "Disable" }, function (err, data) {
        if (err) {
            res.json({ msg: "Something Wrong", status: -1, data: err })
        }
        else {
            res.json({ msg: "Data Retraive", status: 200, data: data })
        }
    })
}
module.exports.getAllManager = function (req, res) {
    UserModel.find({ role: "62473b5dff3a1f2757fd9ce1" }, function (err, managers) {
        if (err) {
            res.json({ msg: "Something Wrong", status: -1, data: req.body })
        }
        else {
            //console.log(managers)
            res.json({ msg: "Data Retraive", status: 200, data: managers })
        }
    })
}