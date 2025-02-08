const lib = require("jarmlib");
const User = require('../../model/user/main');

const bcrypt = require('bcrypt');

const userController = {};

userController.update = async (req, res) => {
  let user = new User();
  user.id = req.user.id;
  user.empire_id = req.body.empire_id;

  try {
    let update_response = await user.update();
    if (update_response.err) { return res.send({ msg: update_response.err }); }

    res.send({ done: "Usuário atualizado com sucesso.", user });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao atualizar suas informações, favor contatar o suporte." });
  };
};

userController.create = async (req, res) => {
  let user = new User();
  user.id = req.body.id;
  user.name = req.body.name;
  user.username = req.body.username;
  user.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  user.access = req.body.access;
  user.pass = req.body.pass;

  try {
    var foundUser = await User.findByUsername(user.username);
    if (foundUser.length) { return res.send({ msg: "Este usuário já está cadastrado." }) };

    let createdUser = await user.create();
    if (createdUser.err) { return res.send({ msg: createdUser.err }); }

    res.send({ done: "Informações atualizadas com sucesso.", user });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao atualizar suas informações, favor contatar o suporte." });
  };
};

userController.verify = (req, res, next) => {
  if (req.isAuthenticated()) { return next() };
  return res.redirect('/login');
};

userController.filter = async (req, res) => {
  let props = ["user.id", "user.empire_id"];

  const params = { keys: [], values: [] };
  const strict_params = { keys: [], values: [] };

  lib.Query.fillParam("user.id", req.user.id, strict_params);

  let order_params = [["user.id", "ASC"]];

  try {
    const users = await User.filter({ props, params, strict_params, order_params });
    res.send(users);
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro ao filtrar os produtos." });
  };
};

module.exports = userController;