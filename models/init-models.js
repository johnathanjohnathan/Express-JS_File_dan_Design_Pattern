var DataTypes = require("sequelize").DataTypes;
var _movies = require("./movies");
var _users = require("./users");

function initModels(sequelize) {
  var movies = _movies(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);


  return {
    movies,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
