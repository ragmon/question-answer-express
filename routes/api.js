const express = require('express');
const Question = require('../db/model/question');
const router = express.Router();

router.get('/question', function(req, res, next) {
  Question.all().then((questions) => {
    console.log("rows", questions);
    res.send(JSON.stringify(questions));
  });
});

router.get('/question/:id', function(req, res, next) {
  const question = Question.find(req.params.id);

  res.send(JSON.stringify(question));
});

router.post('/question', function(req, res, next) {
  const question = Question.create(req.body);

  res.send(JSON.stringify(question));
});

router.put('/question/:id', function(req, res, next) {
  //
});

router.delete('/question/:id', function(req, res, next) {
  //
});

router.post('/question/:id/rate_up', function(req, res, next) {
  //
});

router.post('/question/:id/rate_down', function(req, res, next) {
  //
});

router.post('/question/:id/answer', function(req, res, next) {
  //
});

module.exports = router;
