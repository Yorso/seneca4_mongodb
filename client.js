/**
 * MongoDB microservice example
 * Ejemplo de microservicios MongoDB 
 * 
 * 
 * CRUD (Create Read Update Delete) MongoDB aplication - Aplicación MongoDB CRUD (Create Read Update Delete)
 * 
 * 
 * Try it writing in browser - Pruébalo escribiendo en el navegador:
 * 
 * 	Create user: http://localhost:3000/users/add/?nusu=Peter Smith&age=34&address=123, Main Street&email=psmith@email.com  
 *  Get all users: http://localhost:3000/users/get/
 *  Get an user by id: http://localhost:3000/users/getId/577cc3a16f5a22e20d054da0     //Change id
 *  Update user name by id: http://localhost:3000/users/updateId/577c40be46febb975c1f3282/Paul Simpson    //Change id
 *  Remove an user by id: http://localhost:3000/users/deleteId/577cc3a16f5a22e20d054da0     //Change id
 *
 */

var seneca = require("seneca")();
seneca.use('plugin');

var app = require("express")();
app.use(seneca.export("web"));
app.listen(3000);