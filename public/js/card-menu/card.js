Card.controller = {};

Card.controller.create = document.getElementById("card-create-form");
if(Card.controller.create) {
	Card.controller.create.addEventListener("submit", async e => {
		e.preventDefault();

		let card = {
			id: e.target.elements.namedItem('id').value,
			code: e.target.elements.namedItem('code').value,
			name: e.target.elements.namedItem('name').value,
			empire_id: e.target.elements.namedItem('empire').value,
			range_id: e.target.elements.namedItem('range').value,
			hero: e.target.elements.namedItem('hero').value,
			power: e.target.elements.namedItem('power').value,
			ability_id: e.target.elements.namedItem('ability').value,
			image: e.target.elements.namedItem('image').value
		};

		let response = await API.response(Card.save, card);
		if(!response) { return false; }

		e.target.elements.namedItem('id').value = "";
		e.target.elements.namedItem('code').value = "";
		e.target.elements.namedItem('name').value = "";
		e.target.elements.namedItem('range').value = "";
		e.target.elements.namedItem('hero').value = "0";
		e.target.elements.namedItem('power').value = "";
		e.target.elements.namedItem('ability').value = "";
		e.target.elements.namedItem('image').value = "";

		Card.controller.filter.submit.click();
	});
}

Card.controller.edit = async (card_id, param) => {
	let card = await API.response(Card.findById, card_id);
	if(!card) { return false; }

	Card.controller.create.elements.namedItem("id").value = card.id;
	Card.controller.create.elements.namedItem("code").value = card.code;
	Card.controller.create.elements.namedItem("name").value = card.name;
	Card.controller.create.elements.namedItem("empire").value = card.empire_id;
	Card.controller.create.elements.namedItem("range").value = card.range_id;
	Card.controller.create.elements.namedItem("hero").value = card.hero;
	Card.controller.create.elements.namedItem("power").value = card.power;
	Card.controller.create.elements.namedItem("ability").value = card.ability_id;
	Card.controller.create.elements.namedItem("image").value = card.image;
};

Card.controller.filter = document.getElementById("card-filter-form");
if(Card.controller.filter) {
	Card.controller.filter.addEventListener("submit", async e => {
		e.preventDefault();

		let card = {
			code: e.target.elements.namedItem('code').value,
			name: e.target.elements.namedItem('name').value,
			empire_id: e.target.elements.namedItem('empire').value,
			range_id: e.target.elements.namedItem('range').value,
			hero: e.target.elements.namedItem('hero').value,
			ability_id: e.target.elements.namedItem('ability').value
		};

		let cards = await API.response(Card.filter, card);
		if(!cards) { return false; }

		Card.view.filter(cards);
	});
}

Card.view = {};

Card.view.power = (imageContainer, card) => {
	if(card.power) {
		let powerContainer = lib.element.create("div", { class: "box a1 margin-top-5 cursor-2" });
		let powerBorder = lib.element.create("div", {
			class: "mobile-box container width-30 height-30 radius-30",
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
			class: "mobile-box container width-30 height-30 padding-5 radius-30"
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
			style: "border: 2px outset #444;background-image: linear-gradient(to bottom right, #f0f0f0, #f0f0f0, #fff);",
			class: "mobile-box container ground width-30 height-30 padding-4 border-st-2 radius-30"
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
		class: "mobile-box b3 max-width-125 margin-top-10 radius-15 opacity-out-08 cursor-2 noselect",
		onclick: `Card.controller.edit('${card.id}')`
	});

	// card container
	let imageContainer = lib.element.create("div", {
		style: `background-image: url(${card.image});`,
		class: "bg min-height-125 radius-top-10 padding-2 cursor-2"
	});

	card.power && Card.view.power(imageContainer, card);
	card.range_id && Card.view.range(imageContainer, card);
	card.ability_id && Card.view.ability(imageContainer, card);

	// info container
	let infoContainer = lib.element.create("div", {
		class: "mobile-box a1 ground center height-50 radius-bottom-10 cursor-2"
	});

	infoContainer.append(lib.element.create("div", {
		class: "lucida-grande em07 padding-3 bold center cursor-2"
	}, card.name));

	// info container
	let menuContainer = lib.element.create("div", {
		class: "mobile-box a1 ground center height-50 radius-bottom-10 cursor-2"
	});

	menuContainer.append(lib.element.create("div", {
		class: "lucida-grande em07 padding-3 bold center cursor-2"
	}, 'Editar'));

	cardBox.append(imageContainer);
	cardBox.append(infoContainer);
	deck.append(cardBox);
};

Card.view.filter = (cards) => {
	let deck = document.getElementById("card-filter-box");
	deck.innerHTML = "";

	for(let i in cards) {
		Card.view.render(deck, cards[i]);
	};
};

Card.controller.filter.submit.click();