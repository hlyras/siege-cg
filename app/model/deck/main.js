const db = require('../../../config/connection');
const lib = require("jarmlib");

const Deck = function () {
  this.id;
  this.card_id;
  this.user_id;

  this.create = () => {
    if (!this.card_id) { return { err: "É necessário incluir o código da carta" } };
    if (!this.user_id) { return { err: "É necessário incluir o nome da carta" } };

    let obj = lib.convertTo.object(this);
    let { query, values } = lib.Query.save(obj, 'siege.deck');

    return db(query, values);
  };
};

Deck.filter = ({ props, inners, lefts, params, strict_params, in_params, order_params }) => {
  let { query, values } = new lib.Query().select()
    .props(props)
    .table("siege.deck")
    .inners(inners)
    .lefts(lefts)
    .params(params)
    .strictParams(strict_params)
    .inParams(in_params)
    .order(order_params)
    .build();
  return db(query, values);
};

module.exports = Deck;