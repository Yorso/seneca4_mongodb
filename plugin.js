/**
 * Microservice callings - Llamadas a microservicios
 * 
 * Create, get, update and delete users
 * 
 */
module.exports = function(options) {
	var seneca = this;
	var plugin = 'opuser'

	// MACH1: Virtual or physical machine 1. You can use your localhost by simply changing port number (must be different from client.js)
	var senecaUser = seneca
	.use('entity')//It's necessary for MongoDB data treatment
	.client({
	   host: "192.168.1.81", // Change it for MACH1 IP - Cámbialo por la IP de MACH1
		port : 8080
	});

	// Calling to microservice that saves information about user.
	// Llamada a microservicio que guarda información del usuario.
	seneca.add({
		user : "user",
		todo : "add"
	}, function(args, done) {
		var pattern = {
			user : 'user',
			todo : 'create',
			nusu : args.nusu,
			age : args.age,
			address : args.address,
			email : args.email
		}
		senecaUser.act(pattern, function(err, result) {
			done(err, result);
		});
	});
	
	// Calling to microservice that gets all information about users.
	// Llamada a microservicio que obtiene toda la información de los usuarios.
	seneca.add({
		user : "user",
		todo : "get"
	}, function(args, done) {
		var pattern = {
			user : 'user',
			todo : 'read'
		}
		senecaUser.act(pattern, function(err, result) {
			done(err, result);
		});
	});
	
	// Calling to microservice that gets information about an user by id.
	// Llamada a microservicio que obtiene toda la información de un usuario por id.
	seneca.add({
		user : "user",
		todo : "getId"
	}, function(args, done) {
		var pattern = {
			user : 'user',
			todo : 'read',
			search : 'iden',
			iden: args.iden
		}
		senecaUser.act(pattern, function(err, result) {
			done(err, result);
		});
	});
	
	// Calling to microservice that updates an user name by id.
	// Llamada a microservicio que actualiza el nombre de un usuario por id.
	seneca.add({
		user : "user",
		todo : "updateId"
	}, function(args, done) {
		var pattern = {
			user : 'user',
			todo : 'update',
			iden: args.iden,
			nusu: args.nusu
		}
		senecaUser.act(pattern, function(err, result) {
			done(err, result);
		});
	});
	
	// Calling to microservice that deletes an user by id.
	// Llamada a microservicio que elimina un usuario por id.
	seneca.add({
		user : "user",
		todo : "deleteId"
	}, function(args, done) {
		var pattern = {
			user : 'user',
			todo : 'delete',
			iden: args.iden
		}
		senecaUser.act(pattern, function(err, result) {
			done(err, result);
		});
	});
	
	
	
	seneca.act('role:web', {
		use : {
			prefix : '/users',
			pin : 'user:user, todo:*',  // Send any user:user patterns out over
										// the network - envía cualquier patrón
										// user:user por la red
										// IMPORTANT: user:user must match listening service - user:user
										// debe coincidir con el servicio
			map : {// HTTP request methods
				add: {GET:true, POST:true}, 
			    get: {GET:true},
			    getId: {GET:true, suffix:'/:iden'},// Suffix will be the user's id known by us - El sufijo será el id de usuario conocido por nosotros
			    updateId: {GET:true, PUT:true, suffix:'/:iden/:nusu'},
			    deleteId: {GET:true, DELETE:true, suffix:'/:iden'}
			}
		}
	})

	return {
		name : plugin
	}
}