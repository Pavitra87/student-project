module.exports.routes = {
  "POST /user/register": "UserController.register",
  "POST /user/login": "UserController.login",

  //role
  "POST /role/create": "RoleController.create",
  "GET /role/": "RoleController.find",

  //batch
  "GET /batches": "BatchController.getAllBatches",
  "POST /batches/create": "BatchController.createBatches",
  "PUT /batches/:id": "BatchController.updateBatches",
  "DELETE /batches/:id": "BatchController.deleteBatches",

  //curriculum
  "GET /curriculums": "CurriculumController.getAllCurriculum",
  "GET /curriculums/:id": "CurriculumController.getOneCurriculum",
  "POST /curriculums/create": "CurriculumController.createCurriculum",
  "PUT /curriculums/:id": "CurriculumController.updateCurriculum",
  "DELETE /curriculums/:id": "CurriculumController.deleteCurriculum",

  //exam
  "GET /exams": "ExamController.getAllExam",
  "GET /exams/:id": "ExamController.getOneExam",
  "POST /exams/create": "ExamController.createExam",
  "PUT /exams/:id": "ExamController.updateExam",
  "DELETE /exams/:id": "ExamController.deleteExam",

 

  //question
  "GET /questions": "QuestionController.getAllQuestion",
  "GET /questions/:id": "QuestionController.getOneQuestion",
  "POST /questions/create": "QuestionController.createQuestion",
  "PUT /questions/:id": "QuestionController.updateQuestion",
  "DELETE /questions/:id": "QuestionController.deleteQuestion",


  //student answer
  "POST /studentanswer/create":"StudentanswerController.submitAnswers",
  "GET /studentanswer/:studentid":"StudentanswerController.getAnswersByStudent",

  //result
    "GET /result/:studentid":"StudentanswerController.getStudentResult"
};
