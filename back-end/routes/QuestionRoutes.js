const route = require('express').Router();
const {displayQuestion,addQuestion,deleteQuestion,updateQuestion} =require('../controllers/Question') 

route.get('/', displayQuestion)
route.post('/add', addQuestion)
route.delete('/delete/:id', deleteQuestion)
route.put('/update/:id', updateQuestion)



module.exports = route