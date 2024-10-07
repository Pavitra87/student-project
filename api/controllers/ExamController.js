// const Exam = require("../models/Exam");

module.exports = {
  createExam: async function (req, res) {
    const { name, curriculum, student } = req.body;
    try {
      const newExam = await Exam.create({ name, curriculum, student });
      res.status(201).json(newExam);
    } catch (error) {
      sails.log.error("Error creating exam:", error);
      res
        .status(400)
        .json({ error: "'An error occurred while creating the exam.'" });
    }
  },

  getAllExam: async (req, res) => {
    try {
      const exam = await Exam.find();
      return res.status(200).json(exam);
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  getOneExam: async (req, res) => {
    const examId = req.params.id;

    try {
      const exam = await Exam.findOne({ id: examId }).populate('student').populate('curriculum');
      if (!exam) {
        return res.notFound({ error: "No exam found with that ID." });
      }

      return res.json(exam);
    } catch (error) {
      sails.log.error("Error retrieving exam:", error);
      return res.serverError({
        error: "An error occurred while retrieving the exam.",
      });
    }
  },

  deleteExam: async (req, res) => {
    const examId = req.params.id;
    try {
      const deleteExam = await Exam.destroyOne({
        id: examId,
      });

      if (!deleteExam) {
        return res.status(400).json("no exam found with that ID");
      }

      return res
        .status(200)
        .json({ message: "Delete exam successfully", deleteExam });
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  updateExam: async (req, res) => {
    const examId = req.params.id;
    const { name } = req.body;

    try {
      const updatedExam = await Exam.updateOne({
        id: examId,
      }).set({ name });

      if (!updatedExam) {
        return res.notFound({ error: "no exam found with that id" });
      }
      return res.json({
        message: "exam  successfully",
        updatedExam,
      });
    } catch (error) {
      return res.serverError(error);
    }
  },
};
