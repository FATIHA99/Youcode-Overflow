const Question = require('../models/Questions')

function displayQuestion(req, res) {
    Question.find()
        .then((categories) => { res.send(categories) })
        .catch()
}


function addQuestion(req, res) {
    const { body } = req
    Question.create({ ...body })
        .then((e) => { res.json({ message: 'Question added successfully' }) })
        .catch((error) => { res.send(error) })
}

function deleteQuestion(req, res) {
    const id = req.params.id
    Question.findByIdAndRemove(id)
        .then((e) => { res.send( 'question removed') })
        .catch((e) => { res.send(e) })
}

const getOneQuestion = async (req, res) => {
    const { id } = req.params
    try {
        const findOne = await Question.findById({ _id: id })
        if (findOne) res.json(findOne)
        else res.send("not found")
    } catch (error) {
        res.send(error)
    }
}



function updateQuestion(req, res) {
    const { id } = req.params
    const { title, body, language } = req.body
    Question.findById(id)
        .then((e) => {
            if (e) {
                console.log(e.title)
                const updateData = { $set: { title, body,language } }
             
                Question.updateOne({ _id: id }, updateData)
                    .then(() => {
                        res.send('Question updated')
                    })
            }
        })
        .catch((err) => {
            console.log(err)
        })
}



module.exports = { displayQuestion, addQuestion, deleteQuestion, updateQuestion, getOneQuestion }