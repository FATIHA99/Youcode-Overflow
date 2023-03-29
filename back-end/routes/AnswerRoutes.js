const route =  require('express').Router();
const {displayAnswer,addAnswer,deleteAnswer,updateAnswer, displayAnswersofOneQuestion} =require('../controllers/Answer') 

route.get('/', displayAnswer)
route.post('/add', addAnswer)
route.delete('/delete/:id', deleteAnswer)
route.put('/update/:id', updateAnswer)
route.get('/question/:id', displayAnswersofOneQuestion)
module.exports = route