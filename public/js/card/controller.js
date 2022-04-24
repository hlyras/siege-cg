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

		Deck.render(cards, 'deck-collection', "Card.controller.edit", false);
	});
}