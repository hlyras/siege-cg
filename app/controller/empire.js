const Empire = require('../model/empire');
const Card = require('../model/card');

const lib = require("jarmlib");

const empireController = {};

empireController.get = async (req, res) => {
	try {
		let empire = await Empire.get(1);

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