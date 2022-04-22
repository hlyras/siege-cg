const db = require('../../config/connection');
const lib = require("jarmlib");

const Range = function() {
	this.id;
	this.name;
	this.description
	this.image;
	this.image_white;
};

Range.list = () => {
	let query = "SELECT * FROM siege.ranges;";
	return db(query);
};

module.exports = Range;