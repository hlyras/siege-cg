const pathController = {};

const Reach = require('../model/reach/main');
const Empire = require('../model/empire/main');
const Ability = require('../model/ability/main');

pathController.index = async (req, res) => {
	if (req.user) {
		return res.render('index', { user: req.user });
	};
	res.render('user/login/index', { user: req.user });
};

pathController.login = async (req, res) => {
	if (req.user) {
		return res.redirect("/");
	};
	res.render('user/login', { user: req.user, message: req.flash('loginMessage') });
};

pathController.deckMenu = async (req, res) => {
	let empires = await Empire.list();
	let reaches = await Reach.list();

	res.render('deck-menu/index', { empires, reaches });
};

pathController.queue = async (req, res) => {
	console.log(req.app.get('socketio'));
	res.render('match/queue');
};

pathController.match = async (req, res) => {
	// console.log(req.app.get('socketio'));
	// console.log(io);
	// console.log(io);
	// match.connection(io, user);

	// console.log(req.app.get('socketio'));

	res.render('match/index');
};

module.exports = pathController;