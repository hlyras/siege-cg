const db = require('../../../config/connection');
const lib = require("jarmlib");

const Ability = function () {
  this.id;
  this.name;
  this.description
  this.image;
  this.image_white;
};

Ability.list = () => {
  let query = "SELECT * FROM siege.ability;";
  return db(query);
};

module.exports = Ability;