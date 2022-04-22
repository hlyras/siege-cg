const playerController = {};

const Card = require('../model/card');
const Player = require('../model/player');

playerController.index = async (req, res) => {
	res.render('index');
};

playerController.empire = {};

playerController.empire.set = async (req, res) => {
	try {
		await Player.empire.set(req.params.empire_id, 1);
		res.send({ done: "done" });
	} catch (err) {
		console.log(err);
		res.send({ msg: 'Ocorreu um erro ao adicionar a carta.' });
	}
};

playerController.deck = {};

playerController.deck.list = async (req, res) => {
	try {
		let deck_cards = await Player.deck.list(1, req.params.empire_id);
		res.send(deck_cards);
	} catch (err) {
		console.log(err);
		res.send({ msg: 'Ocorreu um erro ao adicionar a carta.' });
	}
};

playerController.deck.add = async (req, res) => {
	try {
		let card = (await Card.findById(req.params.card_id))[0];

		let player_deck = (await Player.deck.findByUserId(1))[0];

		if(card.empire_id != player_deck.empire_id) { return res.send({ msg: "Ocorreu um erro ao adicionar carta, por favor atualize a página" }); }

		await Player.deck.add(1, card.empire_id, card.id);

		res.send({ done: "add" });
	} catch (err) {
		console.log(err);
		res.send({ msg: 'Ocorreu um erro ao adicionar a carta.' });
	}
};

playerController.deck.remove = async (req, res) => {
	try {
		await Player.deck.remove(1, req.params.card_id);
		res.send({ done: "remove" });
	} catch (err) {
		console.log(err);
		res.send({ msg: 'Ocorreu um erro ao adicionar a carta.' });
	}
};

module.exports = playerController;