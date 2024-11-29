const express = require('express');
const router = express.Router();
const controller = require('../controller/hotline_contact.contoller');

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

// Define routes
app.get('/hotline-contacts', controller.getAllHotlineContacts);
app.get('/hotline-contacts/:id', controller.getHotlineContactById);
app.post('/hotline-contacts', controller.createHotlineContact);
app.put('/hotline-contacts/:id', controller.updateHotlineContact);
app.delete('/hotline-contacts/:id', controller.deleteHotlineContactById);
app.delete('/hotline-contacts', controller.deleteAllHotlineContacts);

// module.exports = router;
}