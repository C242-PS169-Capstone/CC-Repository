const controller = require("../controller/journaling.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

// Route to get all journals
app.get('/journals', controller.getAllJournaling);

// Route to create a new journal
app.post('/journals', controller.createJournaling);

// Route to get a journal by ID
app.get('/journals/:id', controller.getJournalingById);

// Route to update a journal by ID
app.put('/journals/:id', controller.updateJournaling);

// Route to delete a journal by ID
app.delete('/journals/:id', controller.deleteJournaling);

app.get("/journaling/user/:user_id", controller.getAllJournalingByUserId);

};