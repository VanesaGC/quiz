var models = require('../models/models.js');

// GET /quizes/index
exports.index = function(req, res){
  models.Quiz.findAll().then(function(quizes){
      console.log('Primera pregunta: ' + quizes[0].pregunta);
      console.log('Primera id: ' + quizes[0].id);
                                res.render('quizes/index.ejs',{quizes: quizes});
                                }) 
};

// GET /quizes/:id
exports.show = function(req, res){
    models.Quiz.find(req.params.quizId).then(function(quiz){
        console.log('Entra en exports.show');
        res.render('quizes/show.ejs', {quiz: quiz});
    });
}
    
// GET /quizes/question
exports.question = function(req, res){
  models.Quiz.findAll().success(function(quiz){
                                console.log("Pregunta: " +quiz[0].pregunta);
                                res.render('quizes/question',{pregunta: quiz[0].pregunta,
                                                             title: 'Quiz'})
                                });  
};

// GET /quizes/:id/answer
exports.answer = function(req, res){
    models.Quiz.find(req.params.quizId).then(function(quiz){
        if(req.query.respuesta === quiz.respuesta){
            res.render('quizes/answer', {quiz: quiz,
                                         respuesta: 'Correcto'});   
        }else{
            res.render('quizes/answer', {quiz: quiz,
                                         respuesta: 'Incorrecto'});  
        }
    })
       
};

