const route = require('express').Router();
const { deleteComment, addComment, displayComment } = require('../controllers/Comment')

route.post('/add', addComment)
route.get('/:id', displayComment)
route.delete('/delete/:id', deleteComment)



module.exports = route