const db = require('../../config/connection');
const lib = require("jarmlib");

const Card = function() {
	this.id;
	this.name;
	this.empire_id;
	this.range_id
	this.ability_id;
	this.image;

	this.save = () => {
		if(!this.name) { return { err: "É necessário incluir o nome da carta" } };
        if(!this.empire_id) { return { err: "É necessário selecionar o império da carta" } };
        if(!this.range_id) { return { err: "É necessário incluir a distância de combate da carta" } };
        if(!this.image) { return { err: "É necessário selecionar a imagem da carta" } };

        let obj = lib.convertTo.object(this);
		let query = lib.Query.save(obj, 'siege.cards');

        return db(query);
	};
};

module.exports = Card;