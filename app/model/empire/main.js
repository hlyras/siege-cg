const db = require('../../../config/connection');
const lib = require("jarmlib");

const Empire = function () {
  this.id;
  this.name;
  this.description
  this.image;
};

Empire.filter = ({ props, inners, lefts, params, strict_params, in_params, order_params }) => {
  let { query, values } = new lib.Query().select()
    .props(props)
    .table("siege.empire")
    .inners(inners)
    .lefts(lefts)
    .params(params)
    .strictParams(strict_params)
    .inParams(in_params)
    .order(order_params)
    .build();
  return db(query, values);
};

module.exports = Empire;