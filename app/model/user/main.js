const db = require('../../../config/connection');
const lib = require('jarmlib');
const bcrypt = require('bcrypt');

const User = function () {
  this.id;
  this.email;
  this.domain;
  this.business;
  this.password;
  this.name;
  this.access;
  this.balance;
  this.token;

  this.create = () => {
    let obj = lib.convertTo.object(this);
    let { query, values } = lib.Query.save(obj, 'siege.user');

    return db(query, values);
  };

  this.update = () => {
    if (!this.id) { return { err: "O id do usuário é inválido" }; }

    let obj = lib.convertTo.object(this);
    let { query, values } = lib.Query.update(obj, 'siege.user', 'id');

    return db(query, values);
  };
};

User.filter = ({ props, inners, params, strict_params, in_params, order_params }) => {
  let { query, values } = new lib.Query().select().props(props).table("siege.user user")
    .inners(inners).params(params).strictParams(strict_params).inParams(in_params).order(order_params).build();
  return db(query, values);
};

User.findById = id => {
  let query = `SELECT * FROM siege.user WHERE id = ?;`;
  return db(query, [id]);
};

User.findByUsername = username => {
  let query = `SELECT * FROM siege.user WHERE username = ?;`;
  return db(query, [username]);
};

User.findByToken = token => {
  let query = `SELECT * FROM siege.user WHERE token = ?;`;
  return db(query, [token]);
};

User.token = (token, id) => {
  let query = `UPDATE siege.user SET token = ? WHERE id = ?;`;
  return db(query, [token, id]);
};

User.destroyToken = token => {
  let query = `UPDATE siege.user SET token = ? WHERE token = ?;`;
  return db(query, [null, token]);
};

User.recoverToken = (token, id) => {
  let query = `UPDATE siege.user SET recover_token = ? WHERE id = ?;`;
  return db(query, [token, id]);
};

User.findByRecoverToken = token => {
  let query = `SELECT id, business, domain FROM siege.user WHERE recover_token = ?;`;
  return db(query, [token]);
};

User.destroyRecoverToken = token => {
  let query = `UPDATE siege.user SET recover_token = ? WHERE recover_token = ?;`;
  return db(query, [null, token]);
};

User.confirmEmail = (id) => {
  let query = `UPDATE siege.user SET status = ? WHERE id = ?;`;
  return db(query, ['Active', id]);
};

User.findByEmail = email => {
  let query = `SELECT * FROM siege.user WHERE email = ?;`;
  return db(query, [email]);
};

User.findByBusiness = business => {
  let query = `SELECT * FROM siege.user WHERE business = ?`;
  return db(query, [business]);
};

User.findByDomain = domain => {
  let query = `SELECT * FROM siege.user WHERE domain = ?`;
  return db(query, [domain]);
};

User.balance = user_id => {
  let query = `SELECT balance FROM siege.user WHERE id = ?`;
  return db(query, [user_id]);
};

module.exports = User;