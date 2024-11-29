const controller = require('../controller/journaling_class.controller');

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Define routes for journaling class
  app.get('/journaling-classes', controller.getAllJournalingClasses);
  app.get('/journaling-classes/:id', controller.getJournalingClassById);
  app.post('/journaling-classes', controller.createJournalingClass);
  app.put('/journaling-classes/:id', controller.updateJournalingClass);
  app.delete('/journaling-classes/:id', controller.deleteJournalingClassById);
  app.delete('/journaling-classes', controller.deleteAllJournalingClasses);
};
