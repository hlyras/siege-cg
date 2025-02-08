const Card = require('../../model/card/main');
const Range = require('../../model/range/main');
const Empire = require('../../model/empire/main');
const Ability = require('../../model/ability/main');

const lib = require("jarmlib");

const cardController = {};

cardController.menu = async (req, res) => {
  let empires = await Empire.filter({});
  let ranges = await Range.filter({});
  let abilities = await Ability.list();

  res.render('card-menu/index', { empires, ranges, abilities });
};

cardController.create = async (req, res) => {
  let card = new Card();
  if (req.body.id) { card.id = req.body.id };
  if (req.body.code) { card.code = req.body.code };
  if (req.body.name) { card.name = req.body.name };
  if (req.body.empire_id) { card.empire_id = req.body.empire_id };
  if (req.body.range_id) { card.range_id = req.body.range_id };
  if (req.body.hero) { card.hero = req.body.hero };
  if (req.body.power) { card.power = req.body.power };
  if (req.body.ability_id) { card.ability_id = req.body.ability_id };
  if (req.body.image) { card.image = req.body.image };

  try {
    if (!card.id) {
      let response = await card.create();
      if (response.err) { return res.send({ msg: response.err }); }
      res.send({ done: "Carta criada com sucesso!" });
    } else {
      let response = await card.update();
      if (response.err) { return res.send({ msg: response.err }); }
      res.send({ done: "Carta atualizada com sucesso!" });
    }
  } catch (err) {
    if (err.code == "ER_DUP_ENTRY") { return res.send({ msg: "Duplicidade para: " + err.sqlMessage.split("'")[1] }); }
    console.log(err);
    res.send({ msg: 'Ocorreu um erro ao criar carta.' });
  };
};

cardController.list = async (req, res) => {
  let props = [
    'card.*',
    'range.name range_name',
    'range.description range_description',
    'range.image range_image',
    'range.image_white range_image_white',
    'ability.name ability_name',
    'ability.image ability_image',
    'ability.image_white ability_image_white'
  ];

  let inners = [
    ['siege.range range', 'range.id', 'card.range_id'],
    ['siege.ability ability', 'card.ability_id', 'ability.id']
  ];

  let orderParams = [["code", "ASC"]];

  try {
    let cards = await Card.filter({ props, inners, orderParams });
    res.send(cards);
  } catch (err) {
    console.log(err);
    res.send('msg: Ocorreu um erro ao listar cartas');
  }
};

cardController.findById = async (req, res) => {
  try {
    let card = await Card.findById(req.params.id);
    res.send(card);
  } catch (err) {
    console.log(err);
    res.send('msg: Ocorreu um erro ao listar cartas');
  }
};

cardController.filter = async (req, res) => {
  let props = [
    'card.*',
    'range.name range_name',
    'range.description range_description',
    'range.image range_image',
    'range.image_white range_image_white',
    'ability.name ability_name',
    'ability.image ability_image',
    'ability.image_white ability_image_white'
  ];

  let inners = [
    ['siege.range', 'range.id', 'card.range_id'],
  ];

  let lefts = [
    ['siege.ability', 'card.ability_id', 'ability.id']
  ];

  let params = { keys: [], values: [] };
  let strict_params = { keys: [], values: [] };

  lib.Query.fillParam("card.code", req.body.code, strict_params);
  lib.Query.fillParam("card.name", req.body.name, params);
  lib.Query.fillParam("card.empire_id", req.body.empire_id, strict_params);
  lib.Query.fillParam("card.range_id", req.body.range_id, strict_params);
  lib.Query.fillParam("card.hero", req.body.hero, strict_params);
  lib.Query.fillParam("card.ability_id", req.body.ability_id, strict_params);

  let order_params = [["code", "ASC"]];

  try {
    let cards = await Card.filter({ props, inners, lefts, params, strict_params, order_params });
    res.send(cards);
  } catch (err) {
    console.log(err);
    res.send('msg: Ocorreu um erro ao listar cartas');
  }
};

cardController.findByEmpireId = async (req, res) => {
  let strict_params = { keys: [], values: [] };

  let props = [
    'card.*',
    'range.name range_name',
    'range.description range_description',
    'range.image range_image',
    'range.image_white range_image_white',
    'ability.name ability_name',
    'ability.image ability_image',
    'ability.image_white ability_image_white'
  ];

  let inners = [
    ['siege.range', 'range.id', 'card.range_id']
  ];

  let lefts = [
    ['siege.ability', 'card.ability_id', 'ability.id']
  ];

  lib.Query.fillParam("card.empire_id", req.params.empire_id, strict_params);

  let order_params = [["code", "ASC"]];

  try {
    let cards = await Card.filter({ props, inners, lefts, strict_params, order_params });
    res.send(cards);
  } catch (err) {
    console.log(err);
    res.send('msg: Ocorreu um erro ao listar cartas');
  }
};

module.exports = cardController;