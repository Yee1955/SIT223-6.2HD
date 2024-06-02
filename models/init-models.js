var DataTypes = require("sequelize").DataTypes;
var _Art = require("./Art");
var _ArtGallery = require("./ArtGallery");
var _Artist = require("./Artist");

function initModels(sequelize) {
  var Art = _Art(sequelize, DataTypes);
  var ArtGallery = _ArtGallery(sequelize, DataTypes);
  var Artist = _Artist(sequelize, DataTypes);

  Art.belongsTo(ArtGallery, { as: "artGallery", foreignKey: "artGalleryId"});
  ArtGallery.hasMany(Art, { as: "arts", foreignKey: "artGalleryId"});
  Art.belongsTo(Artist, { as: "artist", foreignKey: "artistId"});
  Artist.hasMany(Art, { as: "arts", foreignKey: "artistId"});

  return {
    Art,
    ArtGallery,
    Artist,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
