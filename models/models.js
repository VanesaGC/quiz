var path = require('path');

var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6]||null);
var user = (url[2]||null);
var pwd = (url[3]||null);
var protocol = (url[1]||null);
var dialect = (url[1]||null);
var port = (url[5]||null);
var host = (url[4]||null);
var storage = process.env.DATABASE_STORAGE;

// Cargar Modelo ORM
var Sequelize = require('sequelize');


// Usar DB SQLite o Postgres
var sequelize = new Sequelize(DB_name, user, pwd, {
    dialect: protocol, 
    protocol: protocol,
    port: port,
    host: host,
    storage: storage, // Sólo SQLite .env
    omitNull: true    // Sólo Postgres
});

// Importar la definición de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

// Importar la definición de la tabla Quiz en comment.js
var Comment = sequelize.import(path.join(__dirname, 'comment'));

Comment.belongsTo(Quiz);// Un comentario pertenece a un Quiz
Quiz.hasMany(Comment); // Un Quiz puede tener muchos comentarios


exports.Quiz = Quiz; // exporta definición de la tabla Quiz
exports.Comment = Comment;

// sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().success(function(){
                            // success(..) ejecuta el manejador una vez creada la tabla
    Quiz.count().success(function(count){
                            if(count === 0){ // La tabla sólo se inicializa si está vacía
                               Quiz.create({pregunta: 'Capital de Italia',
                                           respuesta: 'Roma',
                                           tema: 'Ciencia'});
                               Quiz.create({pregunta: 'Capital de Portugal',
                                           respuesta: 'Lisboa',
                                           tema: 'Ciencia'})
                                   .then(function(){console.log('Base de datos inicializada')});
                            };
    });
});

