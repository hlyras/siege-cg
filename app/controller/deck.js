const cards = require('../model/cards');

const deckController = {};

deckController.main = {};

deckController.main.add = async (req, res) => { 
	res.send();
};

deckController.main.remove = async (req, res) => { 
	res.send();
};

// customerController.delete = async (req, res) => {
// 	if(!await userController.verifyAccess(req, res, ['adm'])){
// 		return res.send({ unauthorized: "Você não tem permissão para realizar esta ação!" });
// 	};

// 	try {
// 		await Customer.delete(req.query.id);
// 		res.send({ done: 'Cliente excluído com sucesso!' });
// 	} catch (err) {
// 		console.log(err);
// 		res.send({ msg: "Ocorreu um erro ao remover o produto, favor entrar em contato com o suporte." });
// 	};
// };

module.exports = deckController;