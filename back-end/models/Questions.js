const mongoose = require('mongoose')
// ! title _ body _tags[] _ created at _user _ comment_id 

let question = new mongoose.Schema({
    title: String,
    body: String,
    tags: [],
    created_at: {
        type: Date,
        default : Date.now(),
    },
    user: Object,
    comment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments'
    }
})
const Question = mongoose.model('Questions', question)
module.exports = Question