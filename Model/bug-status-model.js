const mongoose = require("mongoose")


let BugStatusSchema = new mongoose.Schema({

    statusName: {
        type: String,
    }
})


const BugStatusModel = mongoose.model("bugStatus", BugStatusSchema)
module.exports = BugStatusModel