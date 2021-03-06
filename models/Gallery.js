module.exports = function ( sequelize, DataTypes ) {
  var Gallery = sequelize.define( "Gallery", {
    title: DataTypes.STRING,
    link: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function ( models ) {
        Gallery.belongsTo(models.User );
      }
    }
  });

  return Gallery;
};