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
  const user = req.body.user;
  db.unclassifiedAnswers(user).then((questions) => {
    res.send(questions);
  });
});

router.get("/classifiedAnswers", (req, res) => {
  const user = req.body.user;
  db.classifiedAnswers(user).then((questions) => {
    res.send(questions);
  });
});

router.get("/getByUserName", (req, res) => {
  const userName = req.body.userName;
  db.getQuestionsByUserName(userName).then((questions) => {
    res.send(questions);
  });
});

router.put("/update", (req, res) => {
  const classification = req.body.classification;
  const id = req.body.id;
  console.log(classification);
  console.log(id);
  db.updateAnswer(classification, id).then((err) => {
    console.log(err);
    if (err) {
      res.status(500).json({ error: err });
    }
    res.status(200).end();
  });
});

router.get;

module.exports = router;
