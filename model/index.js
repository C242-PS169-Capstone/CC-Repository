const config = require("../config/database.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect, // 'mysql' will be used
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle,
    },
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.journaling = require("./journaling.model.js")(sequelize, Sequelize);
db.emergency_contact = require("./emergency_contact.model.js")(sequelize, Sequelize);
db.hotline_contact = require("./hotline_contact.model.js")(sequelize, Sequelize);
db.journaling_class = require("./journaling_class.model.js")(sequelize, Sequelize);
db.users = require('./users.model.js')(sequelize, Sequelize);

// db.role = require("../model/role.model.js")(sequelize, Sequelize);

// db.role.belongsToMany(db.user, {
//   through: "user_roles",
// });
// db.user.belongsToMany(db.role, {
//   through: "user_roles",
// });

// db.ROLES = ["user", "admin"];

module.exports = db;