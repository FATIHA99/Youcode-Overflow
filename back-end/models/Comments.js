const mongoose = require("mongoose");
const comment = new mongoose.Schema({
  //   commentID: String,
  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Questions",
  },
  comment: String,
  created_at: {
    type: Date,
    default: Date.now(),
  },
  user: Object,
});
const Comments = mongoose.model("Comments", comment);
module.exports = Comments
