const express = require("express")
const mongoose = require("mongoose")
const cors=require("cors")

const sessionController = require("./Controller/session-controller")
const roleController = require("./controller/role-controller")
const userController = require("./controller/user-controller")
const statusController = require("./controller/status-controller")
const priorityController = require("./controller/priority-controller")
const projectController = require("./controller/project-controller")
const projectTeamController = require("./controller/projectTeam-controller")
const taskUserController = require("./controller/taskUser-controller")
const moduleController = require("./controller/module-controller")
const taskController = require("./controller/task-controller")
const bugController = require("./controller/bug-controller")
const bugStatusController = require("./Controller/bug-status-controller")
const moduleUserController = require("./Controller/moduleUser-controller")
const bugListController = require("./Controller/bug-list-controller")

const BugStatusModel = require("./model/bug-status-model")
const app = express()

//middle ware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
mongoose.connect('mongodb://localhost:27017/js',function(err){
    if(err){
        console.log("Connection not Established");
        console.log(err);
    }
    else{
        console.log("Database Connected");
    }
})
app.get("/",function(req,res){
    res.write("Welcome.....")
    res.end()
})
/*app.get("/login")
app.listen(3000,function(){
    console.log("server started on 3000");
})
app.get("/login",function(req,res){
    res.write("Login...")
    res.end()
})
app.get("/signup",function(req,res){
    res.write("Signup...")
    res.end()
})*/
// app.get("/login",sessionController.login)
// app.get("/signup",sessionController.signup)

//app.post("/saveuser",sessionController.saveuser)

//Login

app.post("/sendotp", sessionController.sendOTP)
app.post("/otpVerification", sessionController.otpVerification)


//role
app.post("/roles",roleController.addRole)
app.get("/roles",roleController.getAllRoles)
app.delete("/roles/:roleId",roleController.deleteRoles)
app.put("/roles",roleController.updateRole)
app.get("/roles/:roleId",roleController.getRoleById)
app.get("/role", roleController.getRoles)
app.get("/roleStatus/:roleId", roleController.roleStatus)


//user
app.post("/saveuser",userController.addUser)
app.get("/users",userController.getAllUser)
app.delete("/users/:userId",userController.deleteUser)
app.put("/users",userController.updateUser)
app.get("/users/:userId", userController.getUserById)
app.get("/pendingusers",userController.pendingusers)
app.post("/disableuser/",userController.disableUser)
app.post("/approveUser",userController.approveUser)
app.put("/changePassword", userController.changePassword)
app.get("/getuserName/:userId", userController.getuserName)

//user-login
app.post("/login",userController.login)
app.get("/managers", userController.getAllManager)
app.get("/usersforProjectManager", userController.usersforProjectManager)
app.get("/getAllManagers",userController.getAllManagers)
app.get("/getAllDeveloper",userController.getAllDeveloper)
app.get("/getAllTester",userController.getAllTester)
app.get("/getUserbyRole/:role", userController.getUserbyRole)
app.get("/getAllDevs", userController.getAllDevs)
app.get("/getUsersById/:userId",userController.getUsersById)


//status    
app.post("/status",statusController.addStatus)
app.get("/status",statusController.getAllStatus)
app.delete("/status/:statusId",statusController.deleteStatus)
app.put("/status",statusController.updateStatus)
app.get("/getStatusName/:statusId",statusController.getStatusName)
app.get("/getStatusNameforTester/:statusId",bugStatusController.getStatusName)

//priority
app.post("/priority",priorityController.addPriority)
app.get("/priority",priorityController.getAllPriority)
app.delete("/priority/:priorityId",priorityController.deletePriority)
app.put("/priority",priorityController.updatePriority)
app.get("/getpriorityName/:priorityId",priorityController.getpriorityName)

//project
app.post("/projects",projectController.addProject)
app.get("/projects",projectController.getAllProject)
app.delete("/projects/:projectId",projectController.deleteProject)
app.put("/projects",projectController.updateproject)
app.get("/projects/:projectId",projectController.getProjectById)
app.get("/pendingProjects",projectController.pendingProjects)
app.get("/completedProjects",projectController.completedProjects)
app.get("/getAllprojects/:projectManagerId",projectController.getAllProjects)// project manager
app.get("/getAllPendingProject/:projectManagerId",projectController.getAllPendingProject)
app.get("/getAllCompletedProject/:projectManagerId",projectController.getAllCompletedProject)
app.get("/getprojectbyStatus/:status",projectController.getprojectbyStatus)
app.get("/getProjectTitle/:projectId",projectController.getProjectTitle)

//projectTeam
    // app.post("/projectTeams",projectTeamController.addProjectTeamMember)
    // app.get("//projectTeams/:project",projectTeamController.getAllProjectMember)
    // app.delete("/projectTeam/:projectTeamId",projectTeamController.deleteProjectTeamMember)
    // app.get("/disableUserForProject/:user",projectTeamController.disableUserForProject)
app.post("/projectTeams", projectTeamController.addProjectTeamMember)
app.get("/projectTeams/:project", projectTeamController.getAllProjectMember)
app.delete("/projectTeams/:projectTeamId", projectTeamController.deleteProjectTeamMember)
app.get("/disableUserForProject/:user", projectTeamController.disableUserForProject)
app.get("/getProjectforDev/:devId",projectTeamController.getProjectforDev)
app.get("/getTesterbyProject/:projectId",projectTeamController.getTesterbyProject)

//module
app.post("/modules",moduleController.addModule)
app.get("/modules",moduleController.getAllmodule)
app.delete("/modules/:moduleId",moduleController.deleteModule)
app.put("/modules",moduleController.updateModule)
app.get("/modules/:moduleId",moduleController.getModuleById)
app.get("/module/:project",moduleController.getModulebyproject)
app.get("/getModulebyProject/:projectId", moduleController.getModule)
app.get("/getModulebyStatus/:statusId", moduleController.getModulebyStatus)

//moduleUser
app.post("/moduleusers", moduleUserController.addModuleUser)
app.get("/moduleusers", moduleUserController.getAllModuleUser)
app.get("/getModulebyPM/:projectManagerId", moduleUserController.getModulebyProjectManager)
app.delete("/deleteUserModules/:moduleId",moduleUserController.deleteModules)


//task
app.post("/tasks",taskController.addTask)
app.get("/tasks",taskController.getAllTask)
app.delete("/tasks/:taskId",taskController.deleteTask)
app.put("/tasks",taskController.updateTask)
app.get("/tasks/:taskId",taskController.getTaskById)
app.post("/getTaskbyProject", taskController.getTaskbyProject)
app.get("/getTaskbyProject/:projectId", taskController.getTask)
app.get("/getTaskbyModule/:moduleId", taskController.getTaskbyModule)
app.get("/getTaskbyStatus/:statusId", taskController.getTaskbyStatus)
app.get("/getTaskbyTester/:testerId",taskController.getTaskbyTester)
app.get("/getPendingTaskforTester/:testerId",taskController.getPendingTaskforTester)
app.post("/noBug",taskController.noBug)

//taskUser
app.post("/taskusers",taskUserController.addTaskUser)
app.get("/taskusers",taskUserController.getAllTaskUser)
app.delete("/taskusers/:taskUser",taskUserController.deleteTaskUser)
app.post("/getTaskbyDevelop", taskUserController.getTaskbyDevelop)
app.get("/getPendingTaskforDev/:devId",taskUserController.getPendingTaskforDev)
app.post("/getTaskbyProjectforDev",taskUserController.getTaskbyProjectforDev)
app.post("/submitTask",taskUserController.submitTask)

//bug
app.post("/bugs",bugController.addBug)
app.get("/bugs",bugController.getAllBug)
app.delete("/bugs",bugController.deleteBug)
app.put("/bugs",bugController.updateBug)
app.get("/getBugforTester/:testerId",bugController.getBugforTester)
app.get("/getbugTaskforDev/:devId",bugController.getbugTaskforDev)

//bug status
app.post("/bugStatus", bugStatusController.addBugStatus)
app.get("/bugStatus", bugStatusController.getAllBugStatus)
app.get("/getStatusName/:statusId",bugStatusController.getStatusName)

//bug list
app.post("/addBugs", bugListController.addBugList)
app.get("/ListBugs", bugListController.getAllBug)
app.delete("/deleteBugs/:bugId", bugListController.deleteBug)
app.put("/updatebugs", bugListController.updateBug)
app.get("/getBugbyId/:bugId",bugListController.getBugbyId)

//server
app.listen(3000,function(){
    console.log("server started on 3000");
})