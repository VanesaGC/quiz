var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

/* GET author. */
router.get('/author', function(req, res) {
  res.render('author', { title: 'Quiz: Créditos',
                        author: 'Vanesa García Campos',
                        /*photo: 'images/foto.png'*/});
});

module.exports = router;

router.get('/quizes/question', quizController.question);

router.get('/quizes/answer', quizController.answer);