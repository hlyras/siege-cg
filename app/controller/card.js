const Card = require('../model/card');
const Range = require('../model/range');
const Empire = require('../model/empire');
const Ability = require('../model/ability');

const lib = require("jarmlib");

const cardController = {};

cardController.save = async (req, res) => {
	let card = new Card();
	if(req.body.id) { card.id = req.body.id };
	if(req.body.code) { card.code = req.body.code };
	if(req.body.name) { card.name = req.body.name };
	if(req.body.empire_id) { card.empire_id = req.body.empire_id };
	if(req.body.range_id) { card.range_id = req.body.range_id };
	if(req.body.hero) { card.hero = req.body.hero };
	if(req.body.power) { card.power = req.body.power };
	if(req.body.ability_id) { card.ability_id = req.body.ability_id };
	if(req.body.image) { card.image = req.body.image };

	try {
		if(!card.id) {
			let response = await card.save();
			if(response.err) { return res.send({ msg: response.err }); }
			console.log(response);
			res.send({ done: "Carta criada com sucesso!" });
		} else {
			let response = await card.update();
			if(response.err) { return res.send({ msg: response.err }); }
			console.log(response);
			res.send({ done: "Carta atualizada com sucesso!" });
		}
	} catch (err) {
		if(err.code == "ER_DUP_ENTRY") { return res.send({ msg: "Duplicidade para: "+err.sqlMessage.split("'")[1] }); } 
		console.log(err);
		res.send({ msg: 'Ocorreu um erro ao criar carta.' });
	};
};

cardController.list = async (req, res) => {
	let props = [
		'cards.*',
		'ranges.name range_name',
		'ranges.description range_description',
		'ranges.image range_image',
		'ranges.image_white range_image_white',
		'abilities.name ability_name',
		'abilities.image ability_image',
		'abilities.image_white ability_image_white'
	];

	let inners = [
		['siege.ranges ranges', 'siege.ranges.id', 'cards.range_id'],
		['siege.abilities abilities', 'cards.ability_id', 'siege.abilities.id']
	];
	
	let orderParams = [ ["code","ASC"] ];

	try {
		let cards = await Card.filter(props, inners, [], [], orderParams, 0);
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
		'cards.*',
		'ranges.name range_name',
		'ranges.description range_description',
		'ranges.image range_image',
		'ranges.image_white range_image_white',
		'abilities.name ability_name',
		'abilities.image ability_image',
		'abilities.image_white ability_image_white'
	];

	let inners = [
		['siege.ranges ranges', 'siege.ranges.id', 'cards.range_id'],
		['siege.abilities abilities', 'cards.ability_id', 'siege.abilities.id']
	];

	let params = { keys: [], values: [] };
	let strictParams = { keys: [], values: [] };

	lib.Query.fillParam("cards.code", req.body.code, strictParams);
	lib.Query.fillParam("cards.name", req.body.name, params);
	lib.Query.fillParam("cards.empire_id", req.body.empire_id, strictParams);
	lib.Query.fillParam("cards.range_id", req.body.range_id, strictParams);
	lib.Query.fillParam("cards.hero", req.body.hero, strictParams);
	lib.Query.fillParam("cards.ability_id", req.body.ability_id, strictParams);

	let orderParams = [ ["code","ASC"] ];

	try {
		let cards = await Card.filter(props, inners, params, strictParams, orderParams, 0);
		res.send(cards);
	} catch (err) {
		console.log(err);
		res.send('msg: Ocorreu um erro ao listar cartas');
	}
};

cardController.findByEmpireId = async (req, res) => {
	let strictParams = { keys: [], values: [] };
	
	let props = [
		'cards.*',
		'ranges.name range_name',
		'ranges.description range_description',
		'ranges.image range_image',
		'ranges.image_white range_image_white',
		'abilities.name ability_name',
		'abilities.image ability_image',
		'abilities.image_white ability_image_white'
	];

	let inners = [
		['siege.ranges ranges', 'siege.ranges.id', 'cards.range_id'],
		['siege.abilities abilities', 'cards.ability_id', 'siege.abilities.id']
	];

	lib.Query.fillParam("cards.empire_id", req.params.empire_id, strictParams);

	let orderParams = [ ["code","ASC"] ];

	try {
		let cards = await Card.filter(props, inners, [], strictParams, orderParams, 0);
		res.send(cards);
	} catch (err) {
		console.log(err);
		res.send('msg: Ocorreu um erro ao listar cartas');
	}
};

module.exports = cardController;