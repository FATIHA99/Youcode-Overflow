const mongoose = require('mongoose')

let answer = new mongoose.Schema({
    question_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Questions"
    },
    answer: String,
    created_at: {
        type: Date,
        default: Date.now(),
    },
    user: Object,
    comment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments'
    }
})
const Answers = mongoose.model('Answers', answer)
module.exports = Answers