const Comment = require('../models/Comments')

function displayComment(req, res) {
    const answerId = req.params.id;
    Comment.find({ answer_id: answerId })
        .then((response) => { res.send(response) })
        .catch()
}

function addComment(req, res) {
    const { body } = req
    Comment.create({ ...body })
        .then((e) => { res.json({ message: 'Comment added successfully' }) })
        .catch((error) => { res.send(error) })
}

function deleteComment(req, res) {
    const id = req.params.id
    Comment.findByIdAndRemove(id)
        .then((e) => { res.send( 'Comment removed') })
        .catch((e) => { res.send(e) })
}


module.exports = { displayComment, addComment, deleteComment}