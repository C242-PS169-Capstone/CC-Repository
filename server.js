const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables

// Load the raw MySQL pool
const db = require('./model'); // This is the MySQL pool-based implementation

const app = express();
const port = process.env.PORT || 8081; // Use PORT from .env if available

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Default route
app.get("/", (req, res) => {
  res.json({ status: "Hearhere is finally here" });
});

// Load routes and pass the `db` object to them
require('./route/journaling.route')(app, db);
require('./route/emergency_contact.route')(app, db);
require('./route/users.route')(app, db);

// Start server
app.listen(port, () => {
  console.log(`Hearhere REST API is running on port ${port}`);
});

