var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});

/* GET author. */
router.get('/author', function(req, res) {
  res.render('author', { title: 'Quiz: Créditos',
                        author: 'Vanesa García Campos', errors: []
                        /*photo: 'images/foto.png'*/});
});

module.exports = router;

// Autoload de comandos con :quizId
router.param('quizId', quizController.load); // autoload :quizId

// Definición de rutas
//router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

router.get('/quizes', quizController.search);

// GET /quizes/new
router.get('/quizes/new', quizController.new);

// POST /quizes/create
router.post('/quizes/create', quizController.create);

// GET /quizes/:id/create
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);

// PUT /quizes/:id/update
router.put('/quizes/:quizId(\\d+)', quizController.update);

// DELETE /quizes/:id
router.delete('/quizes/:quizId(\\d+)', quizController.destroy);