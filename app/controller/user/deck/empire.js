const empireController = {};

const User = require('../../../model/user/main');

empireController.set = async (req, res) => {
  if (!req.user) { return res.send({ unauthorized: "Você não tem permissão para realizar esta ação." }); }

  let user = new User();
  user.id = req.user.id;
  user.empire_id = req.params.empire_id;

  console.log(user);

  try {
    let response = await user.update();
    if (response.err) { return res.send({ msg: response.err }); }

    res.send({ done: "done" });
  } catch (err) {
    console.log(err);
    res.send({ msg: 'Ocorreu um erro ao adicionar a carta.' });
  }
};

module.exports = empireController;