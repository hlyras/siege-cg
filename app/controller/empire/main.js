const Empire = require('../../model/empire/main');

const lib = require("jarmlib");

const empireController = {};

empireController.filter = async (req, res) => {
  try {
    let empires = await Empire.filter({});
    res.send(empires);
  } catch (err) {
    console.log(err);
    res.send('msg: Ocorreu um erro ao listar cartas');
  }
};

module.exports = empireController;