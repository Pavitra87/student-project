module.exports = {
  createCurriculum: async function (req, res) {
    const { name, batch } = req.body;
    try {
      const newCurriculum = await Curriculum.create({ name, batch });
      res.status(201).json(newCurriculum);
    } catch (error) {
      sails.log.error("Error creating curriculum:", error);
      res
        .status(400)
        .json({ error: "'An error occurred while creating the curriculum.'" });
    }
  },

  getAllCurriculum: async (req, res) => {
    try {
      const curriculums = await Curriculum.find()
        .populate("batch")
        .populate("exam");
      return res.status(200).json(curriculums);
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  getOneCurriculum: async (req, res) => {
    const curriculumId = req.params.id;

    try {
      const curriculum = await Curriculum.findOne({ id: curriculumId })
        .populate("batch")
        .populate("exam");

      if (!curriculum) {
        return res.notFound({ error: "No curriculum found with that ID." });
      }

      return res.json(curriculum);
    } catch (error) {
      sails.log.error("Error retrieving curriculum:", error);
      return res.serverError({
        error: "An error occurred while retrieving the curriculum.",
      });
    }
  },

  deleteCurriculum: async (req, res) => {
    const curriculumId = req.params.id;
    try {
      const deleteCurriculum = await Curriculum.destroyOne({
        id: curriculumId,
      });

      if (!deleteCurriculum) {
        return res.status(400).json("no curriculum found with that ID");
      }

      return res
        .status(200)
        .json({ message: "Delete curriculum successfully", deleteCurriculum });
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  updateCurriculum: async (req, res) => {
    const curriculumId = req.params.id;
    const { name } = req.body;

    try {
      const updatedCurriculum = await Curriculum.updateOne({
        id: curriculumId,
      }).set({ name });

      if (!updatedCurriculum) {
        return res.notFound({ error: "no curriculum found with that id" });
      }
      return res.json({
        message: "Batch curriculum successfully",
        updatedCurriculum,
      });
    } catch (error) {
      return res.serverError(error);
    }
  },
};
