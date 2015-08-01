var models = require('../models/models.js');

// Autoload - Factoriza el código si la ruta incluye quizId
exports.load = function(req, res, next, quizId){
  models.Quiz.find(quizId).then(function(quiz){
                                if(quiz){
                                    req.quiz = quiz;
                                    next();
                                }else{
                                   next(new Error("No existe quizId=" + quizId)); 
                                }
                                }).catch(function(error){next(Error);}); 
};

// GET /quizes/index
exports.index = function(req, res){
  models.Quiz.findAll().then(function(quizes){
                                res.render('quizes/index.ejs',{quizes: quizes});
                                }) 
};

// GET /quizes/:id
exports.show = function(req, res){
    models.Quiz.find(req.params.quizId).then(function(quiz){
        res.render('quizes/show.ejs', {quiz: req.quiz});
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
    var resultado = 'Incorrecto';
    models.Quiz.find(req.params.quizId).then(function(quiz){
        if(req.query.respuesta === req.quiz.respuesta){
            resultado = 'Correcto';   
        }
        
        res.render('quizes/answer', {quiz: req.quiz,
                                    respuesta: resultado});  
        
    })
       
};

// GET /quizes/search
exports.search = function(req, res){
    var hayBusqueda = false;
    var resultado = 'Incorrecto';
    
    if(req.query.search != null){
        console.log("search existe: " + req.query.search ); 
        
        var search = req.query.search;
        
        search = "%" + search.replace(" ", "%") + "%";
        console.log(search);
        
        models.Quiz.findAll({where:["pregunta like ?",search]}).then(function(quizes){
                                res.render('quizes/search.ejs',{quizes: quizes});
                                })
    }else{
        console.log("No hay parámetro search");
        models.Quiz.findAll().then(function(quizes){
                                res.render('quizes/search.ejs',{quizes: quizes});
                                })
    }
       
};