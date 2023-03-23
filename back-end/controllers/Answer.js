const Answer = require('../models/Answers')

function displayAnswer(req, res) {
    Answer.find()
        .then((answer) => { res.send(answer) })
        .catch()
}


function addAnswer(req, res) {
    const { body } = req
    Answer.create({ ...body })
        .then((e) => { res.json({ message: 'Answer added successfully' }) })
        .catch((error) => { res.send(error) })
}

function deleteAnswer(req, res) {
    const id = req.params.id
    Answer.findByIdAndRemove(id)
        .then((e) => { res.send( 'Answer removed') })
        .catch((e) => { res.send(e) })
}

const getOneAnswer = async (req, res) => {
    const { id } = req.params
    try {
        const findOne = await Answer.findById({ _id: id })
        if (findOne) res.json(findOne)
        else res.send("not found")
    } catch (error) {
        res.send(error)
    }
}



function updateAnswer(req, res) {
    const { id } = req.params
    const { title, body, language } = req.body
    Answer.findById(id)
        .then((e) => {
            if (e) {
                console.log(e.title)
                const updateData = { $set: { title, body,language } }
             
                Answer.updateOne({ _id: id }, updateData)
                    .then(() => {
                        res.send('Answer updated')
                    })
            }
        })
        .catch((err) => {
            console.log(err)
        })
}



module.exports = { displayAnswer, addAnswer, deleteAnswer, updateAnswer, getOneAnswer }