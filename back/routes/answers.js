var express = require("express");
var router = express.Router();

const db = require("../db/MongoClient.js");
/* GET users listing. */
router.get("/", (req, res) => {
  db.getQuestions().then((questions) => {
    res.send(questions);
  });
});

router.get("/unclassifiedAnswers", (req, res) => {
  const user = req.query.user;
  db.unclassifiedAnswers(user).then((answers) => {
    res.send(answers);
  });
});

router.get("/classifiedAnswers", (req, res) => {
  const user = req.query.user;
  db.classifiedAnswers(user).then((answers) => {
    res.send(answers);
  });
});

router.get("/getByUserName", (req, res) => {
  const userName = req.body.userName;
  db.getQuestionsByUserName(userName).then((questions) => {
    res.send(questions);
  });
});

router.put("/classificateAQuestion", (req, res) => {
  const classification = req.body.classification;
  const AID = req.body.AID;
  db.updateAnswer(classification, parseInt(AID)).then((err) => {
    if (err) {
      res.status(500).json({ error: err });
    }
    res.status(200).end();
  });
});

router.get("/findById", (req, res) => {
  const id = req.query.id;
  db.getAnswer(parseInt(id)).then((answer) => {
    if (answer == null) {
      res.send(400).end();
    }
    res.send(answer);
  });
});

module.exports = router;
