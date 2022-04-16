const pathController = {};

pathController.index = async (req, res) => {
	res.render('index');
};

pathController.deckMenu = async (req, res) => {
	res.render('deck-menu/index');
};

module.exports = pathController;