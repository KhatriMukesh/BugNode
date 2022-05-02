const mongoose = require("mongoose")

let RoleSchema = new mongoose.Schema({
roleName:{
    type:String
    },
isActive:{
    type:Boolean
}
})
//modal
let RoleModel = mongoose.model("role",RoleSchema)

module.exports = RoleModel;