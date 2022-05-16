const db = require('../../config/connection');
const lib = require("jarmlib");

const Match = function() {
	this.id;
	this.player_1;
	this.player_2;
	this.status
	this.winner;
};

// Match.findById = (leader_id) => {
// 	let query = "SELECT * FROM siege.leaders WHERE id = '"+leader_id+"';";
// 	return db(query);
// };

// Match.findByEmpireId = (empire_id) => {
// 	let query = "SELECT * FROM siege.leaders WHERE empire_id ='"+empire_id+"';";
// 	return db(query);
// };

Match.filter = (props, inners, params, strict_params, order_params, limit) => {
	let query = new lib.Query().select().props(props).table("siege.match match")
		.left(inners).params(params).strictParams(strict_params).order(order_params).limit(limit).build().query;
	return db(query);
};

module.exports = Match;