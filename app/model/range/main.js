const db = require('../../../config/connection');
const lib = require("jarmlib");

const Range = function () {
  this.id;
  this.name;
  this.description
  this.image;
  this.image_white;
};

Range.filter = ({ props, inners, lefts, params, strict_params, in_params, order_params }) => {
  let { query, values } = new lib.Query().select()
    .props(props)
    .table("siege.range")
    .inners(inners)
    .lefts(lefts)
    .params(params)
    .strictParams(strict_params)
    .inParams(in_params)
    .order(order_params)
    .build();
  return db(query, values);
};

module.exports = Range;