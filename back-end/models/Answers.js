const mongoose = require('mongoose')

let answer = new mongoose.Schema({
    
    answer: String,
    created_at: {
        type: Date,
        default: Date.now(),
    },
    question_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Questions"
    },
    user: Object,
    // comment_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Comments'
    // }
})
const Answers = mongoose.model('Answers', answer)
module.exports = Answers