var express = require("express");
var router = express.Router();

const db = require("../db/MongoClient.js");
/* GET users listing. */
router.get("/", (req, res) => {
  db.getQuestions().then((questions) => {
    res.send(questions);
  });
});

router.get("/getByUserName", (req, res) => {
  const userName = req.body.userName;
  db.getQuestionsByUserName(userName).then((questions) => {
    res.send(questions);
  });
});

router.put("/updateQuestion", (req, res) => {
  const isRelevant = req.body.isRelevant;
  const typeOfLearning = req.body.typeOfLearning;
  const typeOfArchitecture = req.body.typeOfArchitecture;
  const processingModel = req.body.processingModel;
  const mlPipeline = req.body.mlPipeline;
  const goodPractice = req.body.goodPractice;
  const pitfall = req.body.pitfall;
  const externalReferences = req.body.externalReferences;
  const interesting = req.body.interesting;
  const id = req.body.id;

  db.updateQuestion(
    id,
    isRelevant,
    typeOfLearning,
    typeOfArchitecture,
    processingModel,
    mlPipeline,
    goodPractice,
    pitfall,
    externalReferences,
    interesting
  ).then((err) => {
    console.log(err);
    if (err) {
      res.status(500).json({ error: err });
    }
    res.send();
  });
});

router.get;

module.exports = router;
