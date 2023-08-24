const leaderController = {};

const Leader = require('../../../model/leader/main');
const Deck = require('../../../model/user/deck');

leaderController.get = async (req, res) => {
  try {
    let player_deck = (await Deck.deck.findByUserId(1))[0];

    let player_leader = (await Deck.leader.findByEmpireId(1, player_deck.empire_id))[0];

    if (!player_leader) {
      let empire_leaders = await Leader.findByEmpireId(player_deck.empire_id)
      await Deck.leader.save(1, player_deck.empire_id, empire_leaders[0].id);
      player_leader = { leader_id: empire_leaders[0].id };
    }

    res.send(player_leader);
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro favor recarregar a página." });
  }
};

leaderController.set = async (req, res) => {
  try {
    let leader = (await Leader.findById(req.params.leader_id))[0];

    let player_deck = (await Deck.deck.findByUserId(1))[0];

    if (leader.empire_id != player_deck.empire_id) { return res.send({ "msg": "Ocorreu um erro ao alterar o líder, por favor recarregue a página e tente novamente." }) }
    await Deck.leader.set(1, player_deck.empire_id, leader.id);
    res.send(leader);
  } catch (err) {
    console.log(err);
    res.send({ msg: "Ocorreu um erro favor recarregar a página." });
  }
};

module.exports = leaderController;