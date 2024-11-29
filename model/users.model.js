module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define(
      "user",
      {
        user_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        username: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        wa_number: {
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
        is_active: {
          type: Sequelize.BOOLEAN,
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
  