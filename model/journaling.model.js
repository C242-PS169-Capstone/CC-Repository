module.exports = (sequelize, Sequelize) => {
    const Journaling = sequelize.define(
      "journaling",
      {
        journal_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,     // Set journal_id as the primary key
          autoIncrement: true,  // Auto-increment for primary key
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: false,     // Optional: Prevents null values
        },
        created_date: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        user_id: {
          type: Sequelize.STRING,
          defaultValue: Sequelize.NOW,
        },
        question: {
          type: Sequelize.STRING,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        tableName: "journaling", // Prevents Sequelize from pluralizing the table name
        timestamps: false,        // Since you are defining your own created_at and updated_at fields
      }
    );
  
    // Define association with the journaling_class model
    // Journaling.associate = (models) => {
    //   Journaling.belongsTo(models.journaling_class, {
    //     foreignKey: "journal_class_id",
    //     as: "journal_class", // Alias for the relation
    //   });
    // };
  
    return Journaling;
  };
  