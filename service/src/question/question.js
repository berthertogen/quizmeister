const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  text: String,
  correct: Boolean,
  searchField: String,
});
answerSchema.virtual('answerId').get(function() { return this._id.toHexString(); });
answerSchema.set('toJSON', {
  virtuals: true,
  versionKey:false,
  transform: function (doc, ret) {   delete ret._id;delete ret.id;  },
});

const scoringSchema = new mongoose.Schema({
  type: Number,
  weightCorrectAnswer: Number,
  weightNoAnswer: Number,
  timeLimitSeconds: Number,
  timeScoringInterval: Number,
});
scoringSchema.virtual('scoringId').get(function() { return this._id.toHexString(); });
scoringSchema.set('toJSON', {
  virtuals: true,
  versionKey:false,
  transform: function (doc, ret) {   delete ret._id;delete ret.id;  },
});

const questionSchema = new mongoose.Schema({
  shortId: String,
  title: String,
  remark: String,
  type: Number, 
  answers: [answerSchema],
  scoring: scoringSchema,
  modifiedOn: Date,
  searchField: String,
});
questionSchema.virtual('questionId').get(function() { return this._id.toHexString(); });
questionSchema.set('toJSON', {
  virtuals: true,
  versionKey:false,
  transform: function (doc, ret) {   delete ret._id;delete ret.id;  },
});

const Question = mongoose.model('Question', questionSchema);

module.exports = {
  Question
}