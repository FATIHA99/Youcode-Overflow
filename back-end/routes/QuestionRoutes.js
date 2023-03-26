const route = require('express').Router();
const { displayQuestion, displayQuestionOfOneUser, addQuestion, deleteQuestion, updateQuestion } = require('../controllers/Question')
const upload = require('../middleware/upload');
route.get('/all', displayQuestion)
route.get('/user_questions/:id', displayQuestionOfOneUser)
route.post('/add',upload.single('image'), addQuestion)
route.delete('/delete/:id', deleteQuestion)
route.put('/update/:id', updateQuestion)



module.exports = route