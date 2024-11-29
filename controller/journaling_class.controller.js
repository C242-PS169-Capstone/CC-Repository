const db = require("../model");
const JournalingClass = db.journaling_class;
const Response = require("../model/response");

// Get all journaling classes
exports.getAllJournalingClasses = async (req, res) => {
  try {
    const journalingClasses = await JournalingClass.findAll();
    res.status(200).send(new Response(true, 200, "Journaling classes retrieved successfully", journalingClasses));
  } catch (error) {
    res.status(500).send(new Response(false, 500, error.message));
  }
};

// Get a journaling class by ID
exports.getJournalingClassById = async (req, res) => {
  try {
    const journalingClass = await JournalingClass.findByPk(req.params.id);
    if (!journalingClass) {
      return res.status(404).send(new Response(false, 404, "Journaling class not found"));
    }
    res.status(200).send(new Response(true, 200, "Journaling class retrieved successfully", journalingClass));
  } catch (error) {
    res.status(500).send(new Response(false, 500, error.message));
  }
};

// Create a new journaling class
exports.createJournalingClass = async (req, res) => {
  try {
    const { journal_class_status } = req.body;

    // Validate required fields
    if (!journal_class_status) {
      return res.status(400).send(new Response(false, 400, "Journal class status is required"));
    }

    const newJournalingClass = await JournalingClass.create({
      journal_class_status,
    });

    res.status(201).send(new Response(true, 201, "Journaling class created successfully", newJournalingClass));
  } catch (error) {
    res.status(500).send(new Response(false, 500, error.message));
  }
};

// Update a journaling class by ID
exports.updateJournalingClass = async (req, res) => {
  try {
    const { journal_class_status } = req.body;

    const journalingClass = await JournalingClass.findByPk(req.params.id);
    if (!journalingClass) {
      return res.status(404).send(new Response(false, 404, "Journaling class not found"));
    }

    // Update the journaling class
    await journalingClass.update({
      journal_class_status: journal_class_status || journalingClass.journal_class_status,
    });

    res.status(200).send(new Response(true, 200, "Journaling class updated successfully", journalingClass));
  } catch (error) {
    res.status(500).send(new Response(false, 500, error.message));
  }
};

// Delete a journaling class by ID
exports.deleteJournalingClassById = async (req, res) => {
  try {
    const journalingClass = await JournalingClass.findByPk(req.params.id);
    if (!journalingClass) {
      return res.status(404).send(new Response(false, 404, "Journaling class not found"));
    }

    // Delete the journaling class
    await journalingClass.destroy();
    res.status(200).send(new Response(true, 200, "Journaling class deleted successfully"));
  } catch (error) {
    res.status(500).send(new Response(false, 500, error.message));
  }
};

// Delete all journaling classes
exports.deleteAllJournalingClasses = async (req, res) => {
  try {
    await JournalingClass.destroy({ where: {}, truncate: true });
    res.status(200).send(new Response(true, 200, "All journaling classes deleted successfully"));
  } catch (error) {
    res.status(500).send(new Response(false, 500, error.message));
  }
};
