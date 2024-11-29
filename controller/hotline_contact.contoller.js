const db = require("../model");
const HotlineContact = db.hotline_contact;
const Response = require("../model/response");

// Get all hotline contacts
exports.getAllHotlineContacts = async (req, res) => {
  try {
    const contacts = await HotlineContact.findAll();
    res.status(200).send(new Response(true, 200, "Hotline contacts retrieved successfully", contacts));
  } catch (error) {
    res.status(500).send(new Response(false, 500, error.message));
  }
};

// Get a hotline contact by ID
exports.getHotlineContactById = async (req, res) => {
  try {
    const contact = await HotlineContact.findByPk(req.params.id);
    if (!contact) {
      return res.status(404).send(new Response(false, 404, "Hotline contact not found"));
    }
    res.status(200).send(new Response(true, 200, "Hotline contact retrieved successfully", contact));
  } catch (error) {
    res.status(500).send(new Response(false, 500, error.message));
  }
};

// Create a new hotline contact
exports.createHotlineContact = async (req, res) => {
  try {
    const { hotline_name, hotline_number, hotline_type, hotline_location, user_id } = req.body;

    // Validate required fields
    if (!hotline_name || !hotline_number || !hotline_type || !hotline_location || !user_id) {
      return res.status(400).send(new Response(false, 400, "All fields are required"));
    }

    const newContact = await HotlineContact.create({
      hotline_name,
      hotline_number,
      hotline_type,
      hotline_location,
      user_id,
    });

    res.status(201).send(new Response(true, 201, "Hotline contact created successfully", newContact));
  } catch (error) {
    res.status(500).send(new Response(false, 500, error.message));
  }
};

// Update a hotline contact by ID
exports.updateHotlineContact = async (req, res) => {
  try {
    const { hotline_name, hotline_number, hotline_type, hotline_location, user_id } = req.body;

    const contact = await HotlineContact.findByPk(req.params.id);
    if (!contact) {
      return res.status(404).send(new Response(false, 404, "Hotline contact not found"));
    }

    await contact.update({
      hotline_name: hotline_name || contact.hotline_name,
      hotline_number: hotline_number || contact.hotline_number,
      hotline_type: hotline_type || contact.hotline_type,
      hotline_location: hotline_location || contact.hotline_location,
      user_id: user_id || contact.user_id,
    });

    res.status(200).send(new Response(true, 200, "Hotline contact updated successfully", contact));
  } catch (error) {
    res.status(500).send(new Response(false, 500, error.message));
  }
};

// Delete a hotline contact by ID
exports.deleteHotlineContactById = async (req, res) => {
  try {
    const contact = await HotlineContact.findByPk(req.params.id);
    if (!contact) {
      return res.status(404).send(new Response(false, 404, "Hotline contact not found"));
    }

    await contact.destroy();
    res.status(200).send(new Response(true, 200, "Hotline contact deleted successfully"));
  } catch (error) {
    res.status(500).send(new Response(false, 500, error.message));
  }
};

// Delete all hotline contacts
exports.deleteAllHotlineContacts = async (req, res) => {
  try {
    await HotlineContact.destroy({ where: {}, truncate: true });
    res.status(200).send(new Response(true, 200, "All hotline contacts deleted successfully"));
  } catch (error) {
    res.status(500).send(new Response(false, 500, error.message));
  }
};
