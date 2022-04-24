const Empire = require('../model/empire');
const Leader = require('../model/leader');

const lib = require("jarmlib");

const leaderController = {};

leaderController.findByEmpireId = async (req, res) => {
	let strictParams = { keys: [], values: [] };

	lib.Query.fillParam("leaders.empire_id", req.params.empire_id, strictParams);

	let orderParams = [ ["id","ASC"] ];

	try {
		let leaders = await Leader.filter([], [], [], strictParams, orderParams, 0);
		res.send(leaders);
	} catch (err) {
		console.log(err);
		res.send('msg: Ocorreu um erro ao listar cartas');
	}
};

module.exports = leaderController;