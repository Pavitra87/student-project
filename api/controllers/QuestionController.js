module.exports = {
    createQuestion: async function (req, res) {
        const { text, options, correctAnswer,exam } = req.body;
        try {
          const newQuestion = await Question.create({ text, options, correctAnswer,exam });
          res.status(201).json(newQuestion);
        } catch (error) {
          sails.log.error("Error creating exam:", error);
          res
            .status(400)
            .json({ error: "'An error occurred while creating the question.'" });
        }
      },
    
      getAllQuestion: async (req, res) => {
        try {
          const question = await Question.find();
          return res.status(200).json(question);
        } catch (error) {
          return res.status(400).json(error);
        }
      },
    
      getOneQuestion: async (req, res) => {
        const questionId = req.params.id;
    
        try {
          const question = await Question.findOne({ id: questionId }).populate('exam').populate('studentanswer');;
          if (!question) {
            return res.notFound({ error: "No question found with that ID." });
          }
    
          return res.json(question);
        } catch (error) {
          sails.log.error("Error retrieving exam:", error);
          return res.serverError({
            error: "An error occurred while retrieving the exam.",
          });
        }
      },
    
      deleteQuestion: async (req, res) => {
        const questionId = req.params.id;
        try {
          const deleteQuestion = await Question.destroyOne({
            id: questionId,
          });
    
          if (!deleteQuestion) {
            return res.status(400).json("no question found with that ID");
          }
    
          return res
            .status(200)
            .json({ message: "Delete question successfully", deleteQuestion  });
        } catch (error) {
          return res.status(400).json(error);
        }
      },
    
      updateQuestion: async (req, res) => {
        const questionId = req.params.id;
        const { text, options, correctAnswer } = req.body;
    
        try {
          const updatedQuestion = await Question.updateOne({
            id: questionId,
          }).set({ text, options, correctAnswer });
    
          if (!updatedQuestion) {
            return res.notFound({ error: "no question found with that id" });
          }
          return res.json({
            message: "question  successfully",
            updatedQuestion,
          });
        } catch (error) {
          return res.serverError(error);
        }
      },

};

