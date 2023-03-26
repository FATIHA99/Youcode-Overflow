const route = require('express').Router();
const { createUser, login, signout, forgetpassword, resetpassword, verify, banieCompte, getUser } = require('../controllers/User')
const {ForgetValidator} = require('../middleware/userValidator')

route.post('/login', login)
route.post('/register', createUser)
route.post('/forgetpassword',forgetpassword);
route.get('/signout',signout);
route.get('/verify/:token',verify);
route.post('/resetpassword/:token',resetpassword);
route.get('/user/:id',getUser);

module.exports = route