module.exports = (sequelize, Sequelize) => {
    const HotlineContact = sequelize.define(
      "hotline_contact",
      {
        hotline_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        hotline_name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        hotline_number: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        hotline_type: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        hotline_location: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'users',
            key: 'user_id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      },
      {
        tableName: "hotline_contact",
        timestamps: false,
      }
    );
  
    // Define association with the users model
    HotlineContact.associate = (models) => {
      HotlineContact.belongsTo(models.users, {
        foreignKey: "user_id",
        as: "user",
      });
    };
  
    return HotlineContact;
  };
  