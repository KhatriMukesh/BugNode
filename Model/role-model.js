const mongoose = require("mongoose")

let RoleSchema = new mongoose.Schema({
roleName:{
    type:String
    },
isActive:{
    type:Number
}
})
//modal
let RoleModel = mongoose.model("role",RoleSchema)

module.exports = RoleModel;