module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define(
      "user",
      {
        user_id: {
          type: Sequelize.STRING,
          primaryKey: true,
          autoIncrement: false,
          allowNull: false,
        },
        username: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        tableName: "users", // Optional, in case you want to set a custom table name
        timestamps: false,   // Disable timestamps to avoid the 'createdAt' and 'updatedAt' columns
      }
    );
  
    return User;
  };
  