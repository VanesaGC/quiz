var models = require('../models/models.js');
    
// GET /quizes/question
exports.question = function(req, res){
  models.Quiz.findAll().success(function(quiz){
                                console.log("Pregunta: " +quiz[0].pregunta);
                                res.render('quizes/question',{pregunta: quiz[0].pregunta,
                                                             title: 'Quiz'})
                                });  
};

// GET /quizes/answer
exports.answer = function(req, res){
    models.Quiz.findAll().success(function(quiz){
        if(req.query.respuesta === quiz[0].respuesta){
            res.render('quizes/answer', {title: 'Quiz', 
                                         respuesta: 'Correcto'});   
        }else{
            res.render('quizes/answer', {title: 'Quiz',
                                         respuesta: 'Incorrecto'});  
        }
    });
       
};

