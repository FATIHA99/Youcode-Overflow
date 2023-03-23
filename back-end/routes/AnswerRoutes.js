const route =  require('express').Router();
const {displayAnswer,addAnswer,deleteAnswer,updateAnswer} =require('../controllers/Answer') 

route.get('/', displayAnswer)
route.post('/add', addAnswer)
route.delete('/delete/:id', deleteAnswer)
route.put('/update/:id', updateAnswer)

module.exports = route