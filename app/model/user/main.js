const db = require('../../../config/connection');
const lib = require("jarmlib");

const User = function () {
  this.id;
  this.username;
  this.password;

  this.create = () => {
    if (!this.username) { return { err: "É necessário informar um usuário para o colaborador." } };
    if (!this.password) { return { err: "Senha inválida." } };

    let obj = lib.convertTo.object(this);
    let query = lib.Query.save(obj, 'siege.user');

    return db(query);
  };

  this.update = () => {
    if (!this.id) { return { err: "O id da produção é inválido." }; }

    let obj = lib.convertTo.object(this);
    let query = lib.Query.update(obj, 'siege.user', 'id');

    console.log(query);

    return db(query);
  };
};

User.findById = async (id) => {
  let query = `SELECT * FROM siege.user WHERE id='${id}';`;
  return db(query);
};

User.findByUsername = async (username) => {
  let query = `SELECT * FROM siege.user WHERE username='${username}';`;
  return db(query);
};

User.filter = (props, inners, period, params, strict_params, order_params, limit) => {
  let query = new lib.Query().select().props(props).table("siege.user user")
    .inners(inners).params(params).strictParams(strict_params).order(order_params).build().query;
  return db(query);
};

module.exports = User;