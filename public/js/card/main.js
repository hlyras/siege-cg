Card.drawPower = (imageContainer, card) => {
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

Card.drawRange = (imageContainer, card) => {
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

Card.drawAbility = (imageContainer, card) => {
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

Card.draw = (deck, card, switchTo, fromDeck) => {
	let cardBox = lib.element.create("div", {
		class: "mobile-box b3 max-width-125 margin-top-10 radius-15 opacity-out-08 cursor-2 noselect",
		onclick: `${switchTo}('${card.id}', '${fromDeck}')`
	});

	// card container
	let imageContainer = lib.element.create("div", {
		style: `background-image: url(${card.image});`,
		class: "bg min-height-125 radius-top-10 padding-2 cursor-2"
	});

	card.power && Card.drawPower(imageContainer, card);
	card.range_id && Card.drawRange(imageContainer, card);
	card.ability_id && Card.drawAbility(imageContainer, card);

	// info container
	let infoContainer = lib.element.create("div", {
		class: "mobile-box a1 ground center height-50 radius-bottom-10 cursor-2"
	});

	infoContainer.append(lib.element.create("div", {
		class: "lucida-grande em07 bold center cursor-2"
	}, card.name));

	cardBox.append(imageContainer);
	cardBox.append(infoContainer);
	deck.append(cardBox);
};