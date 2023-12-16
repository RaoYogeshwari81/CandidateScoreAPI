var express = require("express");
var candidateTable = require("../model/candidate")
var testScoreTable = require("../model/test_score")

var router = express.Router()
router.post("/addCandidate",(req,res) => {console.log("API Working",req.body)
var candidate = new candidateTable({
    candidateID: req.body.candidateID,
    name: req.body.name,
    email:req.body.email 
})
  
candidate.save().then(
    (data)=>{
        console.log("Save Candidate Successfully" , data)
        return res.status(200).json({saveData : data})
    }
).catch((error)=>{console.log("Error while inserting Candidate" , error)
return res.status(400).json({saveData : error})})
})

//Adding Score for candidate round wise
router.post("/addScore",(req,res) => {console.log("API Working",req.body)
var test_score = new testScoreTable({
    candidateID: req.body.candidateID,
    round: req.body.round,
    score:req.body.score 
})
  
test_score.save().then(
    (data)=>{
        console.log("Saved score for candidate:" + req.body.candidateID , data)
        return res.status(200).json({saveData : data})
    }
).catch((error)=>{console.log("Error while inserting candidate score" , error)
return res.status(400).json({saveData : error})})
})

// Retrieve highest scoring candidate
router.get("/getHighestScoringCandidate", (req, res) => {
    testScoreTable.find().then((data) => {
      const candidates = []
      data.forEach(({ candidateID }) => {
        if (candidates.includes(candidateID)) { } else {
          candidates.push(candidateID)
        }
      })

      const scores = {}
      candidates.forEach(each => {
        const scoresObject = data.filter(({ candidateID }) => {
          return candidateID === each
        })
        const sum = Number(scoresObject.reduce((sum, { score }) => sum + score, 0))
        scores[each] = sum
      })

      const getData = {highestScore: 0, candidateID: 0}
      Object.keys(scores).forEach(candidateID => {
        if (getData.highestScore < scores[candidateID]) {
          getData.highestScore = scores[candidateID]
          getData.candidateID = candidateID
        }
      })

      return res.status(200).json({ getData });
    })
    .catch((error) => {
      console.log("Error data", error);
      return res.status(400).json({ getData: error });
    });
});

// Get round wise average score of all candidates
router.get("/getCandidateAverageScore", (req, res) => {
    testScoreTable.find().then((data) => {
      const rounds = [1,2,3]
      
      const scores = {}
      rounds.forEach(each => {
        const scoresObject = data.filter(({ round }) => {
          return round === each
        })
        const sum = Number(scoresObject.reduce((sum, { score }) => sum + score, 0))
        scores[each] = Number(sum / scoresObject.length).toFixed(2)
      })

      const getData = {averages:[]}
      Object.keys(scores).forEach(round => {
          getData.averages.push({ round, average: scores[round]})
      })

      return res.status(200).json({ getData });
    })
    .catch((error) => {
      console.log("Error data", error);
      return res.status(400).json({ getData: error });
    });
});

module.exports = router;
