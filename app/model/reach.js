const db = require('../../config/connection');
const lib = require("jarmlib");

const Reach = function () {
	this.id;
	this.name;
	this.description
	this.image;
	this.image_white;
};

Reach.list = () => {
	let query = "SELECT * FROM siege.reach;";
	return db(query);
};

module.exports = Reach;