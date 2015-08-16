// MW de autorización de accesos HTTP restringidos
exports.loginRequired = function(req, res, next){
    if(req.session.user){
        next();
    }else{
       res.redirect('/login'); 
    }
}

// GET /login - Formulario login
exports.new = function(req, res){
    var errors = req.session.errors || {};
    req.session.errors = {};
        
    res.render('sessions/new',{errors: errors});    
       
};

// POST /login - Crear la sesión
exports.create = function(req, res){
    
    var login = req.body.login;
    var password = req.body.password;
    
    console.log('Login: ' + login + ' password: ' + password);
    
    var usercontroller = require('./user_controller');
    usercontroller.autenticar(login, password, function(error, user){
        
        if(error){
            req.session.errors = [{"message": 'Se ha producido un error: ' + error}];
            res.redirect("/login");
            return;
        }
        
        //Crear req.session.user y guardar campos id y username
        // La sesión se define por la existencia de: req.session.user
        req.session.user = {id: user.id, username: user.username};        
        
        console.log("Dirección: " + req.session.redir);
        console.log("Dirección: " + req.session.redir.toString());
        
        res.redirect(req.session.redir.toString()); // redirección a path anterior a login
    
    });
};

// DELETE /logout
exports.destroy = function(req, res){
    delete req.session.user;
    res.redirect(req.session.redir.toString()); // redirección a path anterior a login
}