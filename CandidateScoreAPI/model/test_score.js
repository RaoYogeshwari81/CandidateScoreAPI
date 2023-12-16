const mongoose = require("mongoose");
const schema = mongoose.Schema
const {Schema} = mongoose

var tableStructure = new Schema({
    candidateID: { type: Number },
    round: { type: Number },
    score : {type : Number}

},
{timestamps : true})

var testscore = mongoose.model("testscoreDtl",tableStructure)

module.exports = testscore;
