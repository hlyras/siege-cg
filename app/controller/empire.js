const Empire = require('../model/empire');
const Card = require('../model/card');

const lib = require("jarmlib");

const empireController = {};

// mock user
let user = {
	empire_id: 2,
	leader_id: 3,
};

empireController.get = async (req, res) => {
	try {
		let empire = await Empire.get(user.empire_id);

		console.log(empire);

		res.send(empire);
	} catch (err) {
		console.log(err);
		res.send({ msg: 'Erro ao selecionar o império.' });
	};
};

empireController.list = async (req, res) => {
	try {
		let empires = await Empire.list();
		res.send(empires);
	} catch (err) {
		console.log(err);
		res.send({ msg: 'Erro ao listar os impérios.' });
	};
};

module.exports = empireController;