module.exports = (sequelize, Sequelize) => {
    const JournalingClass = sequelize.define(
      "journaling_class",
      {
        journal_class_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        journal_class_status: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        tableName: "journaling_class",
        timestamps: false,
      }
    );
  
    return JournalingClass;
  };
  