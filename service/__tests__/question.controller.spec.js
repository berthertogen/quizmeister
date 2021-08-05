const request = require('superagent');

test("should create question on Post", async () => {
  var response = await request
    .post("http://quizmeister-service/question")
    .send({
      title: 'title',
      remark: 'remark',
      type: 2,
      answers: [
        { text: 'answer 1', correct: true },
        { text: 'answer 2', correct: false }
      ],
      scoring: {
        type: 1,
        weightCorrectAnswer: 1,
        weightNoAnswer: 0,
        timeLimitSeconds: undefined,
        timeScoringInterval: undefined
      }
    })
    .set("Accept", "application/json");
  expect(response.headers["content-type"]).toBe("application/json; charset=utf-8")
  expect(response.status).toBe(200);
  // expect(response.body).toEqual(
  //   {
  //     questionId: 1,
  //     shortId: 1,
  //     title: 'title',
  //     remark: 'remark',
  //     type: 2,
  //     answers: [
  //       { answerId: 1, text: 'answer 1', correct: true, searchField: '' },
  //       { answerId: 2, text: 'answer 2', correct: false, searchField: '' }
  //     ],
  //     scoring: {
  //       scoringId: 1,
  //       type: 1,
  //       weightCorrectAnswer: 1,
  //       weightNoAnswer: 0,
  //       timeLimitSeconds: undefined,
  //       timeScoringInterval: undefined
  //     }
  //   }
  // );
});