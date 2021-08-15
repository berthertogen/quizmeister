const express = require("express");
const { DateTime } = require("luxon");
const { nanoid } = require('nanoid');
const { Question } = require('./question');

const QuestionRouter = express.Router()

QuestionRouter.post("/", async (req, res) => {
	const shortId = nanoid();
	const forDb = { 
		...req.body,
		questionId: 1,
		rounds: null,
		shortId,
		modifiedOn: DateTime.now().toISO(),
		searchField: `${shortId}${req.body.title}${req.body.remark}`.toLowerCase(),
		scoring: {
			...req.body.scoring,
			scoringId: 1,
			timeLimitSeconds: req.body.scoring.timeLimitSeconds ?? 0,
			timeScoringInterval: req.body.scoring.timeScoringInterval ?? 0,
		},
		answers: [
			...req.body.answers.map((a, index) => ({
				...a,
				answerId: index + 1, 
				searchField: `${a.correct}${a.text}`
			}))
		]
	}
	const question = await Question.create(forDb);
	res.send(question);
});

// QuestionRouter.get("/1", async (req, res) => { 
// 	const shortId = nanoid();
// 	const forDb = {
// 		...req.body,
// 		questionId: 1,
// 		rounds: null,
// 		shortId,
// 		modifiedOn: DateTime.now().toISO(),
// 		searchField: `${shortId}${req.body.title}${req.body.remark}`.toLowerCase(),
// 		scoring: {
// 			...req.body.scoring,
// 			scoringId: 1,
// 			timeLimitSeconds: req.body.scoring.timeLimitSeconds ?? 0,
// 			timeScoringInterval: req.body.scoring.timeScoringInterval ?? 0,
// 		},
// 		answers: [
// 			...req.body.answers.map((a, index) => ({
// 				...a,
// 				answerId: index + 1, 
// 				searchField: `${a.correct}${a.text}`
// 			}))
// 		]
// 	}
// 	res.send(forDb);
// });

module.exports = {
	QuestionRouter
};