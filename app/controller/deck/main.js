const Deck = require('../../model/deck/main');
const Empire = require('../../model/empire/main');
const Range = require('../../model/range/main');

const lib = require("jarmlib");

const deckController = {};

deckController.index = async (req, res) => {
  let empires = await Empire.filter({});
  let ranges = await Range.filter({});

  res.render('deck/index', { empires, ranges });
};

deckController.create = async (req, res) => {
  let deck = new Deck();
  deck.card_id = req.body.card_id;
  deck.user_id = req.user.id;

  try {
    let response = await deck.create();
    if (response.err) { return res.send({ msg: response.err }); }

    res.send({ done: "Carta adicionada ao deck!" });
  } catch (err) {
    if (err.code == "ER_DUP_ENTRY") { return res.send({ msg: "Duplicidade para: " + err.sqlMessage.split("'")[1] }); }
    console.log(err);
    res.send({ msg: 'Ocorreu um erro ao adicionar a carta ao deck.' });
  };
};

deckController.filter = async (req, res) => {
  let props = [
    "deck.*",
    "card.name", "card.range_id", "card.hero", "card.empire_id",
    "card.power", "card.ability_id", "card.image"
  ];

  let inners = [
    ["siege.card", "card.id", "deck.card_id"]
  ];

  let strict_params = { keys: [], values: [] };

  lib.Query.fillParam("card.empire_id", req.body.empire_id, strict_params);
  lib.Query.fillParam("deck.user_id", req.user.id, strict_params);

  try {
    let decks = await Deck.filter({ props, inners, strict_params });
    res.send(decks);
  } catch (err) {
    console.log(err);
    res.send('msg: Ocorreu um erro ao listar cartas');
  }
};

module.exports = deckController;