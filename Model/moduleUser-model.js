const mongoose = require("mongoose")

let ModuleUserSchema = new mongoose.Schema({
moduleId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"module"
    },
moduleUser:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
},
})
//modal
const ModuleUserModel = mongoose.model("moduleUser",ModuleUserSchema)
module.exports = ModuleUserModel;