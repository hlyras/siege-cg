const deckController = {};

const Card = require('../../../model/card/main');
const Player = require('../../../model/user/deck');

deckController.index = async (req, res) => {
  res.render('index');
};

deckController.get = async (req, res) => {
  try {
    let player_deck = (await Player.deck.findByUserId(1))[0];
    res.send(player_deck);
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro favor recarregar a página." });
  }
};

deckController.list = async (req, res) => {
  try {
    let deck_cards = await Player.deck.list(1, req.params.empire_id);
    res.send(deck_cards);
  } catch (err) {
    console.log(err);
    res.send({ msg: 'Ocorreu um erro ao adicionar a carta.' });
  }
};

deckController.add = async (req, res) => {
  try {
    let card = (await Card.findById(req.params.card_id))[0];

    let player_deck = (await Player.deck.findByUserId(1))[0];

    if (card.empire_id != player_deck.empire_id) { return res.send({ msg: "Ocorreu um erro ao adicionar carta, por favor atualize a página" }); }

    await Player.deck.add(1, card.empire_id, card.id);

    res.send({ done: "add" });
  } catch (err) {
    console.log(err);
    res.send({ msg: 'Ocorreu um erro ao adicionar a carta.' });
  }
};

deckController.remove = async (req, res) => {
  try {
    await Player.deck.remove(1, req.params.card_id);
    res.send({ done: "remove" });
  } catch (err) {
    console.log(err);
    res.send({ msg: 'Ocorreu um erro ao adicionar a carta.' });
  }
};

module.exports = deckController;