var models = require('../models/models.js');

// GET /quizes/:quizId(\\d+)/comments/new
exports.new = function(req, res){
    console.log("id del quiz: " + req.params.quizId);
    console.log("id del quiz: " + req.quiz.id);
        
    res.render('comments/new.ejs',{quizid: req.params.quizId, errors: []});    
       
};

// POST /quizes/:quizId(\\d+)/comments
exports.create = function(req, res){
    
    // Creamos un objeto comment
    var comment = models.Comment.build(
        {texto: req.body.comment.texto,
         QuizId: req.params.quizId}
    );
    
    var err = comment.validate();
    
    /*comment.validate().then(function(err){*/
        if(err){
            res.render('comments/new.ejs',{comment: comment, quizid: req.params.quizId, errors: err.errors}); 
        }else{
            console.log("Entra en el else");
            comment.save().then(function(){res.redirect('/quizes/' + req.params.quizId)})
        }
    //}).catch(function(error){next(error)});   
};