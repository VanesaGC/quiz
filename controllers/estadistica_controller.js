var models = require('../models/models.js');

// GET /estadistica
exports.show = function(req, res){
    models.Quiz.findAll({ include: [{model: models.Comment}]
                   }).then(function(quizes){
        
        var numPreguntas = quizes.length;
        var numComentariosTotal = 0;
        var mediaComentarioPorPreg = 0;
        var numPregSinComentar = 0;
        var numPregComentadas = 0
        
        if( numPreguntas > 0 ){ 
            for(p in quizes){
                if(quizes[p].comments.length === 0){
                    numPregSinComentar ++;
                }else{
                    numPregComentadas ++;
                }            

                for(c in quizes[p].comments){
                    numComentariosTotal ++;
                }
            }
            mediaComentarioPorPreg = numComentariosTotal / numPreguntas;            
        }
        
        res.render('estadistica.ejs', {numPreguntas: numPreguntas,
                                       numComentariosTotal: numComentariosTotal,
                                       mediaComentarioPorPreg: mediaComentarioPorPreg,
                                       numPregSinComentar: numPregSinComentar,
                                       numPregComentadas: numPregComentadas,
                                       errors: []});
    });
}
