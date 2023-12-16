const mongoose = require("mongoose");
const schema = mongoose.Schema
const {Schema} = mongoose

var tableStructure = new Schema({
    candidateID :{type : Number},
    name:{type : String},
    email:{type: String},

},
{timestamps : true})

var candidate = mongoose.model("CandidateMst",tableStructure)

module.exports = candidate;
