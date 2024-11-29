const express = require('express');
const mysql = require('mysql2'); // using mysql2, as you already installed 
const bodyParser = require('body-parser');
const db = require("./model");

const app = express();
const port = 8080;

app.use(express.json());

// set body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./route/journaling.route')(app);
require('./route/emergency_contact.route')(app);
require('./route/hotline_contact.route')(app);
require('./route/journaling_class.route')(app);
require('./route/users.route')(app);

db.sequelize.sync();

// Your API routes here
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
