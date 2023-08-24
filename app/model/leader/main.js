const db = require('../../../config/connection');
const lib = require("jarmlib");

const Leader = function () {
  this.id;
  this.code;
  this.name;
  this.ability_id;
  this.image;
};

Leader.findById = (leader_id) => {
  let query = "SELECT * FROM siege.leader WHERE id = '" + leader_id + "';";
  return db(query);
};

Leader.findByEmpireId = (empire_id) => {
  let query = "SELECT * FROM siege.leader WHERE empire_id ='" + empire_id + "';";
  return db(query);
};

Leader.filter = (props, inners, params, strict_params, order_params, limit) => {
  let query = new lib.Query().select().props(props).table("siege.leader leader")
    .left(inners).params(params).strictParams(strict_params).order(order_params).limit(limit).build().query;
  return db(query);
};

module.exports = Leader;