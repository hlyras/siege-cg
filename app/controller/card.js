const Card = require('../model/card');
const cards = require('../model/cards');

const cardController = {};

cardController.create = async (req, res) => {
	let card = new Card();
	if(req.body.name) { card.name = req.body.name };
	if(req.body.empire_id) { card.empire_id = req.body.empire_id };
	if(req.body.range_id) { card.range_id = req.body.range_id };
	if(req.body.ability_id) { card.ability_id = req.body.ability_id };
	if(req.body.image) { card.image = req.body.image };

	res.send({ done: "Carta criada com sucesso!" });
};

cardController.list = async (req, res) => {
	res.send({ cards });
};

module.exports = cardController;