let express = require('express')
let routes = express.Router();

let authMid = require('./middleware/authmiddleware')
let authcontroller = require('./controller/authcontroller')
let task = require('./controller/taskcontroller')

routes.post('/register', authcontroller.userregister)
routes.post('/login', authcontroller.userlogin)

//  TASKKKKKKK
routes.post('/task/create', authMid.authM("task_create"), task.create)
routes.get('/task/viewone/:id', authMid.authM('task_viewone'), task.viewOne)
routes.get('/task/viewAll', authMid.authM('task_viewall'), task.viewAll)
routes.post('/task/update/:id', authMid.authM('task_update'), task.update)
routes.delete('/task/delete/:id', authMid.authM('task_delete'), task.tDelete)


module.exports = { routes }