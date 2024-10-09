module.exports = {
  attributes: {
    student: {
      model: 'user', // Assuming 'User' is the model for students
      required: true,
    },
    exam: {
      model: 'Exam', // Assuming 'Exam' is the model for exams
      required: true,
    },
    question: {
      model: 'question', // Assuming 'Question' is the model for questions
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

