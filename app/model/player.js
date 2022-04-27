const db = require('../../config/connection');
const lib = require("jarmlib");

const Player = function () {
	this.id;
	this.name;
	this.email;
	this.empire_id;
	this.leader_id;
	this.wins;
	this.draws;
	this.loses;
};

Player.empire = {};

Player.empire.set = (empire_id, user_id) => {
	let query = "UPDATE siege.player_deck SET empire_id ='"+empire_id+"' WHERE player_id ='"+user_id+"';";
	return db(query);
};

Player.deck = {};

Player.deck.list = (user_id, empire_id) => {
	let query = "SELECT * FROM siege.player_deck_card WHERE player_id='"+user_id+"' AND empire_id='"+empire_id+"';";
	return db(query);
};

Player.deck.add = (player_id, empire_id, card_id) => {
	let query = `INSERT INTO siege.player_deck_card (player_id, empire_id, card_id) VALUES (${player_id}, ${empire_id}, ${card_id});`;
	return db(query);
};

Player.deck.remove = (player_id, card_id) => {
	let query = `DELETE FROM siege.player_deck_card WHERE player_id='${player_id}' AND card_id='${card_id}';`;
	return db(query);
};

Player.deck.findByUserId = (user_id) => {
	let query = "SELECT * FROM siege.player_deck WHERE player_id ='"+user_id+"';";
	return db(query);
};

Player.leader = {};

Player.leader.save = (user_id, empire_id, leader_id) => {
	let query = "INSERT INTO siege.player_deck_leader (player_id, empire_id, leader_id) VALUES ('"+user_id+"','"+empire_id+"','"+leader_id+"');";
	return db(query);
};

Player.leader.set = (user_id, empire_id, leader_id) => {
	let query = "UPDATE siege.player_deck_leader SET leader_id ='"+leader_id+"' WHERE player_id ='"+user_id+"' AND empire_id='"+empire_id+"';";
	return db(query);
};

Player.leader.findByEmpireId = (user_id, empire_id) => {
	let query = "SELECT * FROM siege.player_deck_leader WHERE player_id ='"+user_id+"' AND empire_id='"+empire_id+"';";
	return db(query);
};

module.exports = Player;