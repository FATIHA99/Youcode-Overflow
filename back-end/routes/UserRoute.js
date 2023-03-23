const route = require('express').Router();
const { createUser, login, signout, forgetpassword, resetpassword, verify, banieCompte, getUsers } = require('../controllers/User')
const {ForgetValidator} = require('../middleware/userValidator')

route.post('/login', login)
route.post('/register', createUser)
route.post('/forgetpassword',ForgetValidator,forgetpassword);
route.get('/signout',signout);
route.get('/verify/:token',verify);

module.exports = route