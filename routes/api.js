const express = require('express');
const Question = require('../db/repository/question');
const Answer = require('../db/repository/answer');
const Rate = require('../db/repository/rate');
const router = express.Router();

router.get('/question', function(req, res, next) {
  Question.all()
    .then(questions => res.send(JSON.stringify(questions)))
    .catch(reason => res.send(JSON.stringify({ error : reason })));
});

router.get('/question/:id', function(req, res, next) {
  Question.find(req.params.id)
    .then(question => res.send(JSON.stringify(question)))
    .catch(reason => res.send(JSON.stringify({ error : reason })));
});

router.post('/question', function(req, res, next) {
  Question.create(req.body.title, req.body.description)
    .then(question => res.send(JSON.stringify(question)))
    .catch(reason => res.send(JSON.stringify({ error : reason })));
});

router.put('/question/:id', function(req, res, next) {
  //
});

router.delete('/question/:id', function(req, res, next) {
  //
});

router.post('/question/:id/rate_up', function(req, res, next) {
  Rate.create('question', req.params.id, Rate.ACTION_UP)
    .then(rate => res.send(JSON.stringify(rate)))
    .catch(reason => res.send(JSON.stringify({ error : reason })));
});

router.post('/question/:id/rate_down', function(req, res, next) {
  Rate.create('question', req.params.id, Rate.ACTION_DOWN)
    .then(rate => res.send(JSON.stringify(rate)))
    .catch(reason => res.send(JSON.stringify({ error : reason })));
});

router.post('/question/:id/answer', function(req, res, next) {
  Answer.create(req.params.id, req.body.text)
    .then(answer => res.send(JSON.stringify(answer)))
    .catch(reason => res.send(JSON.stringify({ error : reason })))
});

router.get('/question/:id/answer', function(req, res, next) {
  Answer.findByQuestionId(req.params.id)
    .then(answers => res.send(JSON.stringify(answers)))
    .catch(reason => res.send(JSON.stringify({ error : reason })))
});

module.exports = router;
