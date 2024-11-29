const db = require("../model");
const User = db.users;
const Response = require("../model/response");

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).send(new Response(true, 200, "Users retrieved successfully", users));
    } catch (error) {
        res.status(500).send(new Response(false, 500, error.message));
    }
};

// Get user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).send(new Response(false, 404, "User not found"));
        }
        res.status(200).send(new Response(true, 200, "User retrieved successfully", user));
    } catch (error) {
        res.status(500).send(new Response(false, 500, error.message));
    }
};

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const { username, wa_number, email, password, is_active } = req.body;

        // Validate required fields
        if (!username || !wa_number || !email || !password) {
            return res.status(400).send(new Response(false, 400, "All fields are required"));
        }

        const newUser = await User.create({
            username,
            wa_number,
            email,
            password,
            is_active: is_active || true, // Default to active if not provided
        });

        res.status(201).send(new Response(true, 201, "User created successfully", newUser));
    } catch (error) {
        res.status(500).send(new Response(false, 500, error.message));
    }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
    try {
        const { username, wa_number, email, password, is_active } = req.body;

        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).send(new Response(false, 404, "User not found"));
        }

        // Update the user
        await user.update({
            username: username || user.username,
            wa_number: wa_number || user.wa_number,
            email: email || user.email,
            password: password || user.password,
            is_active: is_active !== undefined ? is_active : user.is_active, // Only update if provided
        });

        res.status(200).send(new Response(true, 200, "User updated successfully", user));
    } catch (error) {
        res.status(500).send(new Response(false, 500, error.message));
    }
};

// Delete a user by ID
exports.deleteUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).send(new Response(false, 404, "User not found"));
        }

        // Delete the user
        await user.destroy();
        res.status(200).send(new Response(true, 200, "User deleted successfully"));
    } catch (error) {
        res.status(500).send(new Response(false, 500, error.message));
    }
};

// Delete all users
exports.deleteAllUsers = async (req, res) => {
    try {
        await User.destroy({ where: {}, truncate: true });
        res.status(200).send(new Response(true, 200, "All users deleted successfully"));
    } catch (error) {
        res.status(500).send(new Response(false, 500, error.message));
    }
};
