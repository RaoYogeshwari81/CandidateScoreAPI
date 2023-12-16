var express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
var router = require("./routes/candidateLink");
var app = express()

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//router use
app.use("/api",router)

const uri = "mongodb+srv://candidateAdmin:candidateAdmin@atlascluster.ncuy4ko.mongodb.net/?retryWrites=true&w=majority";
//DATA_BASE COLLECTION
mongoose.connect (uri)
mongoose.connection.on("connected", () => {
  console.log("CONNECTED TO DATA BASE ");
});
mongoose.connection.on("error", (err) => {
  console.log("oops! error occured", err);
});
//PORT CONNECTION
var port =  process.env.PORT || 5000;
app.listen(port , () => {
  console.log(`Listining to port ${port}`);
});

module.exports = app;
