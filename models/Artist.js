const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Artist', {
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
    nationality: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    born: {
      type: DataTypes.DATE,
      allowNull: true
    },
    died: {
      type: DataTypes.DATE,
      allowNull: true
    },
    biographies: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    artisticStyles: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'artistic_styles'
    }
  }, {
    sequelize,
    tableName: 'artist',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "artist_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
