const Range = require('../../model/range/main');

const lib = require("jarmlib");

const rangeController = {};

rangeController.filter = async (req, res) => {
  let strict_params = { keys: [], values: [] };

  lib.Query.fillParam("range.id", req.body.id, strict_params);

  try {
    let ranges = await Range.filter({ strict_params });
    res.send(ranges);
  } catch (err) {
    console.log(err);
    res.send('msg: Ocorreu um erro ao listar cartas');
  }
};

module.exports = rangeController;