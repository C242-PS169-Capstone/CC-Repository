module.exports = (sequelize, Sequelize) => {
    const EmergencyContact = sequelize.define(
      "emergency_contact",
      {
        emergency_id: {
          type: Sequelize.STRING,
          primaryKey: true,     // Set emergency_id as the primary key
          autoIncrement: false,  // Auto-increment for primary key
        },
        emergency_name: {
          type: Sequelize.STRING,
          allowNull: false,     // Prevents null values
        },
        emergency_number: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        relationship: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        user_id: {
          type: Sequelize.STRING,
          allowNull: false,
          references: {
            model: 'users',     // References the 'users' table
            key: 'user_id',
          },
          onUpdate: 'CASCADE',   // Updates the foreign key if the referenced key changes
          onDelete: 'CASCADE',   // Deletes the record if the referenced user is deleted
        },
      },
      {
        tableName: "emergency_contact", // Prevents Sequelize from pluralizing the table name
        timestamps: false,              // No automatic timestamps
      }
    );
  
    // Define association with the users model
    EmergencyContact.associate = (models) => {
      EmergencyContact.belongsTo(models.users, {
        foreignKey: "user_id",
        as: "user", // Alias for the relation
      });
    };
  
    return EmergencyContact;
  };
  