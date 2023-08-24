const db = require('../../../config/connection');
const lib = require("jarmlib");

const Empire = function () {
  this.id;
  this.name;
  this.description
  this.image;
};

Empire.get = (user_empire_id) => {
  let query = "SELECT * FROM siege.empire WHERE id ='" + user_empire_id + "';";
  return db(query);
};

Empire.list = () => {
  let query = "SELECT * FROM siege.empire;";
  return db(query);
};

Empire.select = (empire_id, user_id) => {
  let query = "UPDATE siege.player_deck SET empire_id ='" + empire_id + "' WHERE 'userid'='" + user_id + "';";
  return db(query);
};

module.exports = Empire;