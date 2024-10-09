module.exports = {
    // Create student answers and evaluate results
    submitAnswers: async function (req, res) {
      try {
        const { student, exam, answers } = req.body; // Extract data from the request body
  
        // Find the exam
        const exams = await Exam.findOne({ id: exam }).populate('question');
  
        if (!exams) {
          return res.status(404).json({ message: 'Exam not found' });
        }
  
        let score = 0;
  
        // Loop through the submitted answers and check if they are correct
        for (const answer of answers) {
          const questions = await Question.findOne({ id: answer.question });
  
          if (!questions) {
            continue; // Skip invalid question IDs
          }
  
          const isCorrect = questions.correctAnswer === answer.selectedOption;
  
          // Save the student's answer in the database
          await StudentAnswer.create({
            student: student,
            exam: exam,
            question: questions.id,
            selectedOption: answer.selectedOption,
            isCorrect: isCorrect
          });
  
          // Increase the score if the answer is correct
          if (isCorrect) {
            score += 1;
          }
        }
  
        // Save the result (score) in the Result model
        await Result.create({
          student: student,
          exam: exam,
          score: score,
          totalQuestions: exam.questions.length
        });
  
        // Return the result and score to the student
        return res.json({
          message: 'Answers submitted successfully',
          score: score,
          totalQuestions: exam.questions.length
        });
  
      } catch (err) {
        return res.serverError(err);
      }
    },
    
    
    // Fetch all answers by student ID
    getAnswersByStudent: async function(req, res) {
      try {
        const answers = await Studentanswer.find({ student: req.params.student });
        return res.json(answers);
      } catch (err) {
        return res.serverError(err);
      }
    },

    //get student result
    getStudentResult: async (req, res) => {
      try {
        const result = await Result.find({ student: req.params.student });
        return res.json(result);
      } catch (error) {
        return res.serverError(error);
      }
    },
  };
  

