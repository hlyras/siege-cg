const pathController = {};

const Range = require('../model/range');
const Empire = require('../model/empire');

pathController.index = async (req, res) => {
	res.render('index');
};

pathController.deckMenu = async (req, res) => {
	let empires = await Empire.list();
	let ranges = await Range.list();

	res.render('deck-menu/index', { empires, ranges });
};

module.exports = pathController;