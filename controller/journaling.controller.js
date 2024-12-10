const db = require("../model");
const Journaling = db.journaling;
const Response = require("../model/response");

exports.getAllJournaling = async (req, res) => {
  try {
    const journaling = await Journaling.findAll();
    res
      .status(200)
      .send(
        new Response(true, 200, "Journaling retrieved successfully", journaling)
      );
  } catch (error) {
    res.status(500).send(new Response(false, 500, error.message));
  }
};

exports.getAllJournalingByUserId = async (req, res) => {
  try {
    const userId = req.params.user_id; // Ambil user_id dari parameter URL

    // Cari semua jurnal yang memiliki user_id yang sesuai
    const journaling = await Journaling.findAll({
      where: { user_id: userId }, // Menyaring berdasarkan user_id
    });

    // Jika tidak ada jurnal ditemukan
    if (journaling.length === 0) {
      return res
        .status(404)
        .send(new Response(false, 404, "No journaling found for this user"));
    }

    // Kirimkan response sukses dengan data jurnal
    res
      .status(200)
      .send(
        new Response(true, 200, "Journals retrieved successfully", journaling)
      );
  } catch (error) {
    // Tangani error jika terjadi
    res.status(500).send(new Response(false, 500, error.message));
  }
};

exports.createJournaling = async (req, res) => {
  try {
    // Extract data from request body
    const { journal_id, content, created_date, user_id, question } = req.body;

    // Validate required fields
    if (!content || !user_id|| !question) {
      return res
        .status(400)
        .send(
          new Response(false, 400, "Content, question, and user_id are required")
        );
    }

    // Create a new journaling entry
    const newJournaling = await Journaling.create({
      journal_id, // Optional if auto-increment
      content,
      question,
      created_date: created_date || new Date(), // Use provided date or current date
      user_id, // Ensure user_id is provided for the journaling entry
    });

    // Send success response
    res
      .status(201)
      .send(
        new Response(
          true,
          201,
          "Journaling created successfully",
          newJournaling
        )
      );
  } catch (error) {
    // Handle errors
    res.status(500).send(new Response(false, 500, error.message));
  }
};

// Get a journal by ID
exports.getJournalingById = async (req, res) => {
  try {
    const journaling = await Journaling.findByPk(req.params.id);
    if (!journaling) {
      return res
        .status(404)
        .send(new Response(false, 404, "Journaling not found"));
    }
    res
      .status(200)
      .send(
        new Response(true, 200, "Journaling retrieved successfully", journaling)
      );
  } catch (error) {
    res.status(500).send(new Response(false, 500, error.message));
  }
};

// Update a journal entry by ID
exports.updateJournaling = async (req, res) => {
  try {
    const { content, journal_class_id, created_date } = req.body;

    // Find the journal entry by ID
    const journaling = await Journaling.findByPk(req.params.id);
    if (!journaling) {
      return res
        .status(404)
        .send(new Response(false, 404, "Journaling not found"));
    }

    // Update the journal entry
    await journaling.update({
      content: content || journaling.content,
      created_date: created_date || journaling.created_date,
    });

    res
      .status(200)
      .send(
        new Response(true, 200, "Journaling updated successfully", journaling)
      );
  } catch (error) {
    res.status(500).send(new Response(false, 500, error.message));
  }
};

// Delete a journal entry by ID
exports.deleteJournaling = async (req, res) => {
  try {
    const journaling = await Journaling.findByPk(req.params.id);
    if (!journaling) {
      return res
        .status(404)
        .send(new Response(false, 404, "Journaling not found"));
    }

    // Delete the journal entry
    await journaling.destroy();
    res
      .status(200)
      .send(new Response(true, 200, "Journaling deleted successfully"));
  } catch (error) {
    res.status(500).send(new Response(false, 500, error.message));
  }
};
