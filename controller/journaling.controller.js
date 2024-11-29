const db = require("../model");
const Journaling = db.journaling;
const Response = require("../model/response");

exports.getAllJournaling = async (req, res) => {
  try {
    const journaling = await Journaling.findAll();
    res
      .status(200)
      .send(
        new Response(true, 200, "journaling retrieved successfully", journaling)
      );
  } catch (error) {
    res.status(500).send(new Response(false, 500, error.message));
  }
};

exports.createJournaling = async (req, res) => {
  try {
    // Extract data from request body
    const { journal_id, content, journal_class_id, created_date } = req.body;

    // Validate required fields
    if (!content || !journal_class_id) {
      return res
        .status(400)
        .send(
          new Response(false, 400, "Content and journal_class_id are required")
        );
    }

    // Create a new journaling entry
    const newJournaling = await Journaling.create({
      journal_id, // Optional if auto-increment
      content,
      journal_class_id,
      created_date: created_date || new Date(), // Use provided date or current date
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
      journal_class_id: journal_class_id || journaling.journal_class_id,
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

// exports.getUserById = async (req, res) => {
//   try {
//     const user = await User.findByPk(req.params.id);
//     if (!user) {
//       return res.status(404).send(new Response(false, 404, "User not found"));
//     }
//     res.status(200).send(new Response(true, 200, "User retrieved successfully", user));
//   } catch (error) {
//     res.status(500).send(new Response(false, 500, error.message));
//   }
// };

// exports.updateUser = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;
//     const hashedPassword = bcrypt.hashSync(password, 8);

//     const user = await User.findByPk(req.params.id);
//     if (!user) {
//       return res.status(404).send(new Response(false, 404, "User not found"));
//     }

//     await user.update({
//       username,
//       email,
//       password: hashedPassword,
//     });

//     res.status(200).send(new Response(true, 200, "User updated successfully", user));
//   } catch (error) {
//     res.status(500).send(new Response(false, 500, error.message));
//   }
// };

// exports.deleteUser = async (req, res) => {
//   try {
//     const user = await User.findByPk(req.params.id);
//     if (!user) {
//       return res.status(404).send(new Response(false, 404, "User not found"));
//     }

//     await user.destroy();
//     res.status(200).send(new Response(true, 200, "User deleted successfully"));
//   } catch (error) {
//     res.status(500).send(new Response(false, 500, error.message));
//   }
// };
