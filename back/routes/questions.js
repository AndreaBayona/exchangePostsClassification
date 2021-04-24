var express = require('express');
var router = express.Router();

const db = require("../db/MongoClient.js");
/* GET users listing. */
router.get('/', (req, res)=>{
  db.getQuestions().then((questions)=> {
    res.send(questions);
    }
  );
});

router.get('/getByUserName', (req, res)=>{
  const userName =  req.body.userName;
  db.getQuestionsByUserName(userName).then((questions)=>{
    res.send(questions);
  });
})

module.exports = router;
