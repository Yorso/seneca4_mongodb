/**
 * CRUD Microservice using MongoDB -Microservicio CRUD usando MongoDB
 * 
 * Create, get, update and delete users
 * 
 */
var plugin = function(options) {
	var seneca = this;

	// Creates a new user - Crea un nuevo usuario
	seneca.add({
		user : "user",
		todo : "create"
	}, function(args, done) {
		var user = this.make$("user");
		user.name = args.nusu;
		user.age = args.age;
		user.address = args.address;
		user.email = args.email;
		user.save$(function(err, users) {
			done(err, user.data$(false));
		});
	});
	
	//Gets the user's list - Obtiene la lista de usuarios
    seneca.add({user: "user", todo: "read"}, function(args, done) {
        var users = this.make$("user");
        users.list$({}, done);
    });
    
    //Gets an user by id - Obtiene un usuario por id
    seneca.add({user: "user", todo: "read", search : 'iden'}, function(args, done) {
        var user = this.make$("user");
        user.load$(args.iden, done);
    });
    
    //Updates an user name by id - Actualiza el nombre de un usuario por id
    seneca.add({user: "user", todo: "update"}, function(args, done) {
		seneca.act({user: "user", todo: "read", search : 'iden', iden: args.iden}, function(err, result) {//Calling to seneca.add({user: "user", todo: "read", search : 'iden'}... method above for getting the user by id
			result.data$({
				name: args.nusu
			});

			result.save$(function(err, user){
				done(err, user.data$(false));
			});
		});
    });
    
    //Delete an user by id - Elimina un usuario por id
    seneca.add({user: "user", todo: "delete"}, function(args, done) {
        var user = this.make$("user");
        user.remove$(args.iden, done);
    });

}
module.exports = plugin;

var seneca = require("seneca")();
seneca.use('entity')//It's necessary for MongoDB data treatment
.use("mongo-store", {// Initialize MongoDB
	name : "example_db",//DB name
	host : "127.0.0.1",
	port : "27017"
})
.use(plugin)
.ready(function(err) {// Ready has a callback to execute after all plugins
						// initialize. If an error occurs during the startup
						// process then the callback function will have an Error
						// instance passed to it.
	seneca.listen({
		prefix : '/users',
		pin : 'user:user',
		port : 8080,
		map : {// HTTP request methods
			create : {GET:false, POST:true}, 
			read: {GET:true},
			update: {GET:false, PUT:true},
			'delete': {GET:false, DELETE:true}
		}
	})
})