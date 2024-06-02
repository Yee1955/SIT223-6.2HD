const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Art', {
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    artGalleryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'art_gallery',
        key: 'id'
      },
      field: 'art_gallery_id'
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    artistId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'artist',
        key: 'id'
      },
      field: 'artist_id'
    },
    yearCreated: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'year_created'
    },
    medium: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    dimension: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    imagePath: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'image_path'
    }
  }, {
    sequelize,
    tableName: 'art',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "art_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
