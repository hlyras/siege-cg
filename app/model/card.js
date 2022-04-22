const db = require('../../config/connection');
const lib = require("jarmlib");

const Card = function() {
	this.id;
	this.name;
	this.range_id
	this.empire_id;
	this.ability_id;
	this.image;

	this.save = () => {
		if(!this.name) { return { err: "É necessário incluir o nome da carta" } };
        if(!this.range_id) { return { err: "É necessário incluir a distância de combate da carta" } };
        if(!this.image) { return { err: "É necessário selecionar a imagem da carta" } };

        let obj = lib.convertTo.object(this);
		let query = lib.Query.save(obj, 'siege.cards');

        return db(query);
	};
};

Card.list = () => {
	let query = "SELECT * FROM siege.cards;";
	return db(query);
};

Card.findById = (card_id) => {
	let query = "SELECT * FROM siege.cards WHERE id = '"+card_id+"';";
	return db(query);
};

Card.filter = (props, inners, params, strict_params, order_params, limit) => {
	let query = new lib.Query().select().props(props).table("siege.cards cards")
		.left(inners).params(params).strictParams(strict_params).order(order_params).limit(limit).build().query;
	return db(query);
};

module.exports = Card;