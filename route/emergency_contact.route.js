const express = require('express');
const router = express.Router();
const controller = require('../controller/emergency_contact.controller');

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

// Define routes
app.get('/emergency-contacts', controller.getAllEmergencyContacts);
app.get('/emergency-contacts/:id', controller.getEmergencyContactById);
app.post('/emergency-contacts', controller.createEmergencyContact);
app.put('/emergency-contacts/:id', controller.updateEmergencyContact);
app.delete('/emergency-contacts/:id', controller.deleteEmergencyContactById);
app.delete('/emergency-contacts', controller.deleteAllEmergencyContacts);

// module.exports = router;
}
