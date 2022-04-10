const ProjectModel = require("../Model/project-model")

//add data to table
module.exports.addProject=function (req,res){
    const projectTitle = req.body.projectTitle  
    const projectManagerID = req.body.projectManagerID
    const description = req.body.description
    const technology = req.body.technology
    const estimatedHours = req.body.estimatedHours
    // const startDate = req.body.startDate
    let d = new Date()
    const startDate = d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear()
    console.log(startDate);
    const complitionHours = req.body.complitionHours
    // const statusId = "624c8bfd796acdf5207e1e50"

    
    let project = new ProjectModel({
        projectTitle:projectTitle,
        projectManagerID:projectManagerID,
        description:description,
        technology:technology,
        estimatedHours:estimatedHours,
        startDate:startDate,
        complitionHours:complitionHours,
        statusId:"624c8bfd796acdf5207e1e50"
    })
    project.save(function(err,success){
        if(err){
            console.log(err);
            res.json({msg:"Something Wrong",status:-1,data:req.body})        
        }
        else{
            res.json({msg:"Project added",status:200,data:success})
        }
    })
}
//list
module.exports.getAllProject = function(req,res){
    ProjectModel.find().populate("statusId").populate("projectManagerID").exec(function(err,roles){
        if(err){
            res.json({msg:"Something Wrong",status:-1,data:req.body})
        }
        else{
            res.json({msg:"Data Retraive",status:200,data:roles})
        }
    })
}
//delete
module.exports.deleteProject = function(req,res){
    let projectId = req.params.projectId
    ProjectModel.deleteOne({_id:projectId},function(err,data) {
        if(err){
            res.json({msg:"Something Wrong",status:-1,data:req.body})
        }
        else{
            res.json({msg:"Delete Successfully",status:200,data:data})
        }
    })
}
//update


// module.exports.updateproject = function(req,res){
//     let projectId = req.body.projectId
//     let projectTitle = req.body.projectTitle
//     let description = req.body.description

//     ProjectModel.updateOne({_id:projectId},{projectTitle:projectTitle},{description:description},function(err,data){
//         if(err){
//             res.json({msg:"Something Wrong",status:-1,data:req.body})
//         }
//         else{
//             res.json({msg:"Data Updated",status:200,data:data})
//         }
//     })
// }

//update

module.exports.updateproject = function (req, res) {
    let projectId = req.body.projectId
    let projectTitle = req.body.projectTitle
    let description = req.body.description
    let projectManagerID = req.body.projectManagerID
    let estimatedHours = req.body.estimatedHours
    let technology = req.body.technology
   // console.log(technology);

    let statusId = req.body.statusId

    ProjectModel.updateOne({ _id: projectId }, { projectTitle: projectTitle,technology:technology,description: description, projectManagerID: projectManagerID,estimatedHours: estimatedHours }, function (err, data) {
        if (err) {
            res.json({ msg: "Something Wrong", status: -1, data: req.body })
        }
        else {
            res.json({ msg: "Data Updated", status: 200, data: data })
        }
    })
}

module.exports.getProjectById = function(req,res){
    let projectId = req.params.projectId
    ProjectModel.findOne({_id:projectId},function(err,success){
        if(err){
            res.json({msg:"Something Wrong",status:-1,data:req.body})
        }
        else{
            res.json({msg:"Data Retraive",status:200,data:success})
        }
    })
}
module.exports.getProjectById = function (req, res) {
    let projectId = req.params.projectId
    ProjectModel.findOne({ _id: projectId }, function (err, data) {
        if (err) {
            res.json({ msg: "Something Wrong", status: -1, data: err })
        }
        else {
            res.json({ msg: "Data Retraive", status: 200, data: data })
        }
    })
}
module.exports.getAllProjects = function (req, res) {
    let projectManagerIDParam = req.params.projectManagerId
    //console.log(projectManagerIDParam)

    ProjectModel.find({ projectManagerID: projectManagerIDParam }).populate("statusId").populate("projectManagerID").exec(function (err, project) {
        if (err) {
            //console.log(err);
            res.json({ msg: "Something Wrong", status: -1, data: err })
        }
        else {
            res.json({ msg: "Data Retraive", status: 200, data: project })
        }
    })
}
module.exports.pendingProjects = function (req, res) {
    ProjectModel.find({statusId:"624c8bfd796acdf5207e1e50"}).populate("statusId").populate("projectManagerID").exec(function (err, project) {
        if (err) {
            res.json({ msg: "Something Wrong", status: -1, data: err })
        }
        else {
            res.json({ msg: "Data Retraive", status: 200, data: project })
        }
    })
}

module.exports.completedProjects = function (req, res) {
    ProjectModel.find({statusId:"624c8bdc796acdf5207e1e4e"}).populate("statusId").populate("projectManagerID").exec(function (err, project) {
        if (err) {
            res.json({ msg: "Something Wrong", status: -1, data: err })
        }
        else {
            res.json({ msg: "Data Retraive", status: 200, data: project })
        }
    })
}