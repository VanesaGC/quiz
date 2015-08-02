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
                                res.render('quizes/index.ejs',{quizes: quizes, errors: []});
                                }) 
};

// GET /quizes/:id
exports.show = function(req, res){
    models.Quiz.find(req.params.quizId).then(function(quiz){
        res.render('quizes/show.ejs', {quiz: req.quiz, errors: []});
    });
}
    
// GET /quizes/question
exports.question = function(req, res){
  models.Quiz.findAll().success(function(quiz){
                                console.log("Pregunta: " +quiz[0].pregunta);
                                res.render('quizes/question',{pregunta: quiz[0].pregunta,
                                                             title: 'Quiz', errors: []})
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
                                    respuesta: resultado, errors: []});  
        
    })
       
};

// GET /quizes/search
exports.search = function(req, res){    
    if(req.query.search != null){
        console.log("search existe: " + req.query.search ); 
        
        var search = req.query.search;
        
        search = "%" + search.replace(" ", "%") + "%";
        console.log(search);
        
        models.Quiz.findAll({where:["pregunta like ?",search]}).then(function(quizes){
                                res.render('quizes/search.ejs',{quizes: quizes, errors: []});
                                })
    }else{
        console.log("No hay parámetro search");
        models.Quiz.findAll().then(function(quizes){
                                res.render('quizes/search.ejs',{quizes: quizes, errors: []});
                                })
    }
       
};

// GET /quizes/new
exports.new = function(req, res){
    
    // Creamos un objeto quiz
    var quiz = models.Quiz.build({pregunta: "Pregunta", respuesta: "Respuesta"});
    
    res.render('quizes/new.ejs',{quiz: quiz, errors: []});    
       
};

// POST /quizes/create
exports.create = function(req, res){
    
    console.log("Entra en create");
    
    // Creamos un objeto quiz
    var quiz = models.Quiz.build(req.body.quiz);
    
    var err = quiz.validate();
    
    /*quiz
        .validate()
        .then(function(err){*/
        if(err){
            console.log("Hay error");
            
            var tabErrores = new Array();
            
            for(var i = 0; i < err.length; i++){
                tabErrores[i] = {message: err[i]};
            }
            
            res.render('/quizes/new', {quiz: quiz, errors: tabErrores});
        }else{
            console.log("No hay error");
            // Guardamos en la base de datos la pregunta y respuesta
            quiz.save({fields: ["pregunta", "respuesta"]}).then(function(){
                    res.redirect('/quizes');
                        }) // Redirección http (url relativo) lista de preguntas
        }
    //});
       
};

// GET /quizes/:id/edit
exports.edit = function(req, res){
    
    // Autoload de instacia de quiz
    var quiz = req.quiz;
    
    res.render('quizes/edit',{quiz: quiz, errors: []});    
       
};

// PUT /quizes/:id
exports.update = function(req, res){
    req.quiz.pregunta = req.body.quiz.pregunta;
    req.quiz.respuesta = req.body.quiz.respuesta;
    
    var err = req.quiz.validate();
    
    if(err){            
            var tabErrores = new Array();
            
            for(var i = 0; i < err.length; i++){
                tabErrores[i] = {message: err[i]};
            }
            
            res.render('/quizes/edit', {quiz: req.quiz, errors: tabErrores});
        }else{
            // Guardamos en la base de datos la pregunta y respuesta
            req.quiz.save({fields: ["pregunta", "respuesta"]}).then(function(){
                    res.redirect('/quizes');
                        }) // Redirección http (url relativo) lista de preguntas
        }
};

// DELETE /quizes/:id
exports.destroy = function(req, res){
    req.quiz.destroy().then(function(){
            res.redirect('/quizes');
        }).catch(function(error){next(error)});
}