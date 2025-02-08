const db = require('../../../config/connection');
const lib = require("jarmlib");

const Card = function () {
  this.id;
  this.code;
  this.name;
  this.reach_id
  this.empire_id;
  this.power;
  this.ability_id;
  this.image;

  this.create = () => {
    if (!this.code) { return { err: "É necessário incluir o código da carta" } };
    if (!this.name) { return { err: "É necessário incluir o nome da carta" } };
    if (!this.image) { return { err: "É necessário selecionar a imagem da carta" } };

    let obj = lib.convertTo.object(this);
    let { query, values } = lib.Query.save(obj, 'siege.card');

    return db(query, values);
  };

  this.update = () => {
    if (!this.id) { return { err: "O id da carta é inválido" }; }
    if (!this.code || this.code.length < 1 || this.code.length > 5) { return { err: "Código inválido" }; }
    if (!this.name || this.name.length < 1 || this.name.length > 40) { return { err: "Nome inválido" }; }

    let obj = lib.convertTo.object(this);
    let { query, values } = lib.Query.update(obj, 'siege.card', 'id');

    return db(query, values);
  };
};

Card.list = () => {
  let query = "SELECT * FROM siege.card;";
  return db(query);
};

Card.findById = (card_id) => {
  let query = "SELECT * FROM siege.card WHERE id = '" + card_id + "';";
  return db(query);
};

Card.filter = ({ props, inners, lefts, params, strict_params, in_params, order_params }) => {
  let { query, values } = new lib.Query().select()
    .props(props)
    .table("siege.card")
    .inners(inners)
    .lefts(lefts)
    .params(params)
    .strictParams(strict_params)
    .inParams(in_params)
    .order(order_params)
    .build();
  return db(query, values);
};

module.exports = Card;