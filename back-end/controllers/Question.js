const Question = require('../models/Questions')
const fs = require('fs');

function displayQuestion(req, res) {
    Question.find()
        .then((categories) => { res.send(categories) })
        .catch()
}

function displayQuestionOfOneUser(req, res) {
  const userId = req.params.id;
  Question.find({ user: userId })
    .then((questions) => {
      res.send(questions);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error retrieving questions");
    });
}

// function addQuestion(req, res) {
//     const { body } = req
//     const img = req.file.filename
//     Question.create({ ...body,image : img })
//         .then((e) => { res.json({ message: 'Question added successfully' }) })
//         .catch((error) => { res.send(error) })
// }


function addQuestion(req, res) {
  const { body, file } = req;

  if (!file) {
    return res.status(400).json({ message: "No image file attached" });
  }

  Question.create({ ...body, image: file.filename })
    .then((question) => {
      res.status(201).json({
        message: "Question added successfully",
        question: question,
      });
    })
    .catch((error) => {

      res.status(500).json({ message: "Error adding question" });
    });
}

// function deleteQuestion(req, res) {
//     const id = req.params.id
//     Question.findByIdAndRemove(id)
//         .then((e) => { 
//           res.send( 'question removed') 
//         })
//         .catch((e) => { res.send(e) })
// }


const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ msg: 'Question not found' });
    }

    // Delete the image file from public folder
    if (question.image) {
      const imagePath = `./public/images/${question.image}`;
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error(err);
        }
        console.log(`${question.image} has been deleted from public folder`);
      });
    }

    await question.deleteOne()

    res.json({ msg: 'Question removed' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

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

        const updateData = { $set: { title, body, language } }
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



module.exports = { displayQuestion, displayQuestionOfOneUser, addQuestion, deleteQuestion, updateQuestion, getOneQuestion }