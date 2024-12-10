const db = require("../model");
const EmergencyContact = db.emergency_contact;
const Response = require("../model/response");

// Get all emergency contacts
exports.getAllEmergencyContacts = async (req, res) => {
  try {
    const contacts = await EmergencyContact.findAll();
    res
      .status(200)
      .send(new Response(true, 200, "Emergency contacts retrieved successfully", contacts));
  } catch (error) {
    res.status(500).send(new Response(false, 500, error.message));
  }
};

// Get an emergency contact by ID
exports.getEmergencyContactById = async (req, res) => {
  try {
    const contact = await EmergencyContact.findByPk(req.params.id);
    if (!contact) {
      return res
        .status(404)
        .send(new Response(false, 404, "Emergency contact not found"));
    }
    res
      .status(200)
      .send(new Response(true, 200, "Emergency contact retrieved successfully", contact));
  } catch (error) {
    res.status(500).send(new Response(false, 500, error.message));
  }
};

// Create a new emergency contact
exports.createEmergencyContact = async (req, res) => {
  try {
    const { emergency_id, emergency_name, emergency_number, relationship, user_id } = req.body;

    // Validate required fields
    if (!emergency_id ||!emergency_name || !emergency_number || !relationship || !user_id) {
      return res
        .status(400)
        .send(new Response(false, 400, "All fields are required"));
    }

    const newContact = await EmergencyContact.create({
      emergency_id,
      emergency_name,
      emergency_number,
      relationship,
      user_id,
    });

    res
      .status(201)
      .send(new Response(true, 201, "Emergency contact created successfully", newContact));
  } catch (error) {
    res.status(500).send(new Response(false, 500, error.message));
  }
};

// Update an emergency contact by ID
exports.updateEmergencyContact = async (req, res) => {
  try {
    const { emergency_name, emergency_number, relationship, user_id } = req.body;

    const contact = await EmergencyContact.findByPk(req.params.id);
    if (!contact) {
      return res
        .status(404)
        .send(new Response(false, 404, "Emergency contact not found"));
    }

    // Update the contact
    await contact.update({
      emergency_name: emergency_name || contact.emergency_name,
      emergency_number: emergency_number || contact.emergency_number,
      relationship: relationship || contact.relationship,
      user_id: user_id || contact.user_id,
    });

    res
      .status(200)
      .send(new Response(true, 200, "Emergency contact updated successfully", contact));
  } catch (error) {
    res.status(500).send(new Response(false, 500, error.message));
  }
};

// Delete an emergency contact by ID
exports.deleteEmergencyContactById = async (req, res) => {
  try {
    const contact = await EmergencyContact.findByPk(req.params.id);
    if (!contact) {
      return res
        .status(404)
        .send(new Response(false, 404, "Emergency contact not found"));
    }

    // Delete the contact
    await contact.destroy();
    res
      .status(200)
      .send(new Response(true, 200, "Emergency contact deleted successfully"));
  } catch (error) {
    res.status(500).send(new Response(false, 500, error.message));
  }
};

// Delete all emergency contacts
exports.deleteAllEmergencyContacts = async (req, res) => {
  try {
    await EmergencyContact.destroy({ where: {}, truncate: true });
    res
      .status(200)
      .send(new Response(true, 200, "All emergency contacts deleted successfully"));
  } catch (error) {
    res.status(500).send(new Response(false, 500, error.message));
  }
};
