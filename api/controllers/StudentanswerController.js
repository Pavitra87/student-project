module.exports = {
    // Create student answers and evaluate results
    submitAnswers: async function(req, res) {
      try {
        const { studentId, examId, answers } = req.body; // answers is an array of { questionId, selectedOption }
        
        const questions = await Question.find({ examId: examId });
        
        // Initialize score and results
        let score = 0;
        const results = [];
  
        // Evaluate each answer
        for (const answer of answers) {
          const question = questions.find(q => q.id === answer.questionId);
          if (question) {
            const isCorrect = question.correctOption === answer.selectedOption; 
            if (isCorrect) {
              score++;
            }
            results.push({
              questionId: question.id,
              selectedOption: answer.selectedOption,
              isCorrect: isCorrect
            });
          }
        }
  
        
        const savedAnswers = await StudentAnswer.createMany(results.map(result => ({
          studentId,
          examId,
          questionId: result.questionId,
          selectedOption: result.selectedOption,
          isCorrect: result.isCorrect
        })));
  
    
        const newResult = await Result.create({
          studentId,
          examId,
          score,
          totalQuestions: questions.length,
          createdAt: new Date(),
          updatedAt: new Date(),
        }).fetch();
  
        return res.json({
          score: score,
          totalQuestions: questions.length,
          results: savedAnswers,
          resultId: newResult.id // Return the result ID for reference
        });
      } catch (err) {
        return res.serverError(err);
      }
    },
  
    // Fetch all answers by student ID
    getAnswersByStudent: async function(req, res) {
      try {
        const answers = await StudentAnswer.find({ studentId: req.params.studentId });
        return res.json(answers);
      } catch (err) {
        return res.serverError(err);
      }
    },
  };
  

