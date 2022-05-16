const pathController = {};

// const match = require('../socket/match');

const Range = require('../model/range');
const Empire = require('../model/empire');
const Ability = require('../model/ability');

let user = {
	id: 1,
	name: 'Henrique Lyra'
}

pathController.index = async (req, res) => {
	res.render('index');
};

pathController.cardMenu = async (req, res) => {
	let empires = await Empire.list();
	let ranges = await Range.list();
	let abilities = await Ability.list();

	res.render('card-menu/index', { empires, ranges, abilities });
};

pathController.deckMenu = async (req, res) => {
	let empires = await Empire.list();
	let ranges = await Range.list();

	res.render('deck-menu/index', { empires, ranges });
};

pathController.queue = async (req, res) => {
	res.render('match/queue');
};

pathController.match = async (req, res) => {
	// console.log(req.app.get('socketio'));
	// console.log(io);
	// console.log(io);
	// match.connection(io, user);
	
	res.render('match/index');
};

module.exports = pathController;