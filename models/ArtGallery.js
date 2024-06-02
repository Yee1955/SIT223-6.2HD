const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ArtGallery', {
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    officialWebsite: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'official_website'
    }
  }, {
    sequelize,
    tableName: 'art_gallery',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "art_gallery_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
