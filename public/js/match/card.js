Card.controller = {};

Card.view = {};

Card.view.power = (imageContainer, card) => {
	if(card.power) {
		let powerContainer = lib.element.create("div", { class: "box a1 margin-top-5 cursor-2" });
		let powerBorder = lib.element.create("div", {
			class: "mobile-box container width-25 height-25 radius-30",
			style: card.hero && "border: 2px outset #fc6a03;background-color:#000;color:#fc6a03;" || !card.hero && "border: 2px outset #444;background-image: linear-gradient(to bottom right, #f0f0f0, #f0f0f0, #fff);"
		});

		powerBorder.append(lib.element.create("div", { 
			class: 'lucida-grande bold em08 center' 
		}, card.power));

		powerContainer.append(powerBorder);
		imageContainer.append(powerContainer);
	} else {
		return false;
	};
};

Card.view.range = (imageContainer, card) => {
	if(card.range_id) {
		let rangeContainer = lib.element.create("div", { class: "box a1 margin-top-5 cursor-2" });
		let rangeBorder = lib.element.create("div", {
			style: "border: 2px outset #444;background-image: linear-gradient(to bottom right, #fc6a03, #fcae1e, #fcae1e);",
			class: "mobile-box container width-25 height-25 padding-2 radius-30"
		});

		rangeBorder.append(lib.element.create("img", {
			src: card.range_image,
			class: "image-fit"
		}));

		rangeContainer.append(rangeBorder)
		imageContainer.append(rangeContainer);
	} else {
		return false;
	};
};

Card.view.ability = (imageContainer, card) => {
	if(card.ability_id) {
		let abilityContainer = lib.element.create("div", { class: "box a1 margin-top-5 cursor-2" });
		let abilityBorder = lib.element.create("div", {
			style: "border:2px outset #444;background-image:linear-gradient(to bottom right, #f0f0f0, #f0f0f0, #fff);",
			class: "mobile-box container ground width-25 height-25 padding-2 border-st-2 radius-30"
		});

		abilityBorder.append(lib.element.create("img", {
			src: card.ability_image,
			class: "image-fit"
		}));

		abilityContainer.append(abilityBorder)
		imageContainer.append(abilityContainer);
	} else {
		return false;
	};
};

Card.view.render = (deck, card) => {
	let cardBox = lib.element.create("div", {
		class: "width-80 margin-top-5 radius-15 opacity-out-08 cursor-2 noselect",
		style: 'display:inline-block;vertical-align:top;',
		onclick: `Card.controller.edit('${card.id}')`
	});

	// card container
	let imageContainer = lib.element.create("div", {
		style: `background-image: url(${card.image});`,
		class: "bg height-90 radius-top-10 padding-2 cursor-2"
	});

	card.power && Card.view.power(imageContainer, card);
	card.range_id && Card.view.range(imageContainer, card);
	card.ability_id && Card.view.ability(imageContainer, card);

	cardBox.append(imageContainer);
	deck.append(cardBox);
};

Card.list = async (empire_id) => {
	let player_deck = document.getElementById("player-deck");

	let player_cards = await API.response(Player.deck.list, empire_id);
	if(!player_cards) { return false; }

	let cards = await API.response(Card.findByEmpireId, empire_id);
	if(!cards) { return alert("Ocorreu um erro, por favor recarregue a página.")}

	for(let i in player_cards) {
		for(let j in cards) {
			if(player_cards[i].card_id == cards[j].id) {
				player_cards[i] = cards[j];
				cards.splice(j, 1);
			}
		};
	};

	for(let i in player_cards) {
		Card.view.render(player_deck, player_cards[i]);
	};
};

Card.list(1);