var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');
var estadisticaController = require('../controllers/estadistica_controller');

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
router.param('commentId', commentController.load); // autoload :commentId

// Definición de rutas session
router.get('/login', sessionController.new);// formulario login
router.post('/login', sessionController.create);// crear sesión
router.get('/logout', sessionController.destroy);// destruir sesión

// Definición de rutas
//router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

router.get('/quizes', quizController.search);

// GET /quizes/new
router.get('/quizes/new', sessionController.loginRequired, quizController.new);

// POST /quizes/create
router.post('/quizes/create', sessionController.loginRequired, quizController.create);

// GET /quizes/:id/create
router.get('/quizes/:quizId(\\d+)/edit', sessionController.loginRequired, quizController.edit);

// PUT /quizes/:id/update
router.put('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.update);

// DELETE /quizes/:id
router.delete('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.destroy);

// Rutas comment
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionController.loginRequired, commentController.publish);

// Rutas estadísticas
// GET /estadistica
router.get('/estadistica', estadisticaController.show);