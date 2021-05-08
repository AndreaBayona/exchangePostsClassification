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

router.post("/classificate", (req, res) => {
  const classification = req.body.classification;
  db.clasificate(classification).then((answer) => {
    res.send(answer);
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
