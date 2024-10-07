module.exports = {
  createBatches: async function (req, res) {
    const { name } = req.body;
    try {
      const newBatches = await Batch.create({ name });
      res.status(201).json(newBatches);
    } catch (error) {
      sails.log.error("Error creating batch:", error);
      res
        .status(400)
        .json({ error: "'An error occurred while creating the batch.'" });
    }
  },

  getAllBatches: async (req, res) => {
    try {
      const batches = await Batch.find();
      return res.status(200).json(batches);
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  deleteBatches: async (req, res) => {
    const batchId = req.params.id;
    try {
      const deleteBatch = await Batch.destroyOne({ id: batchId });

      if (!deleteBatch) {
        return res.status(400).json("no batch found with that ID");
      }

      return res
        .status(200)
        .json({ message: "Delete batch successfully", deleteBatch });
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  updateBatches: async (req, res) => {
    const batchId = req.params.id;
    const { name } = req.body;

    try {
      const updatedBatch = await Batch.updateOne({ id: batchId }).set({ name });

      if (!updatedBatch) {
        return res.notFound({ error: "no batch found with that id" });
      }
      return res.json({ message: "Batch updated successfully", updatedBatch });
    } catch (error) {
      return res.serverError(error);
    }
  },
};
