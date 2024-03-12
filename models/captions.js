module.exports = (sequelize, Sequelize) => {
    const Caption = sequelize.define('Caption', {
        imageUrl: {
          type: Sequelize.STRING,
          allowNull: false
        },
        caption: {
          type: Sequelize.TEXT,
          allowNull: false
        }
      });
      
      // Define association between User and Caption
    Caption.associate = (models) => {
      Caption.belongsTo(models.Users, {
          foreignKey: {
            allowNull: false
          }
        });
      };
    
    return Caption;
}