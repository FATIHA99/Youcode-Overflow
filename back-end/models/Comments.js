const mongoose = require("mongoose");
const comment = new mongoose.Schema({

  comment: String,
  created_at: {
    type: Date,
    default: Date.now(),
  },
  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Questions",
  },
  user: Object,
});
const Comments = mongoose.model("Comments", comment);
module.exports = Comments
