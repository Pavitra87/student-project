module.exports = {
  attributes: {
    studentId: {
      model: 'User', // Assuming 'User' is the model for students
      required: true,
    },
    examId: {
      model: 'Exam', // Assuming 'Exam' is the model for exams
      required: true,
    },
    questionId: {
      model: 'Question', // Assuming 'Question' is the model for questions
      required: true,
    },
    selectedOption: {
      type: 'string', // Store the selected answer option (e.g., 'A', 'B', 'C', 'D')
      required: true,
    },
    isCorrect: {
      type: 'boolean', // Indicates if the selected answer is correct
      defaultsTo: false,
    },
    
  },
};

