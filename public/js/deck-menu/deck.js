const Deck = {};

Deck.info = {};

Deck.info.totalCards = () => {
	return Deck.main.cards.length;
};

Deck.info.unitCards = () => {
	let units = Deck.main.cards.filter(card => card.range_id > 0);
	return parseInt(units.length);
};

Deck.info.specialCards = () => {
	let units = Deck.main.cards.filter(card => card.range_id == 0);
	return parseInt(units.length);
};

Deck.info.heroCards = () => {
	let units = Deck.main.cards.filter(card => card.hero == 1);
	return parseInt(units.length);
};

Deck.info.power = () => {
	let power = Deck.main.cards.reduce((power, card) => power + card.power, 0);

	return power;
};

// Collection
Deck.collection = {};
Deck.collection.cards = [];
Deck.collection.category = false;

Deck.collection.setCategory = (range_id, range_description) => {
	Deck.collection.category = range_id;
	document.getElementById("deck-collection-category").innerHTML = "Todas as cartas";
	if(range_id) { document.getElementById("deck-collection-category").innerHTML = range_description };
};

Deck.collection.render = (switchTo, fromDeck) => {
	let deckBox = document.getElementById('deck-collection');
	deckBox.innerHTML = "";

	Deck.collection.cards = lib.sort(Deck.collection.cards, 'code', 'ASC');

	for(let i in Deck.collection.cards) {
		if(Deck.collection.category) {
			Deck.collection.cards[i].range_id == Deck.collection.category && Card.draw(deckBox, Deck.collection.cards[i], switchTo, fromDeck);
		} else {
			Card.draw(deckBox, Deck.collection.cards[i], switchTo, fromDeck);
		}
	};
};

Deck.collection.filter = (range_id, range_name) => {
	Deck.collection.setCategory(range_id, range_name);
	Deck.collection.render('Card.switchToMain');
};

// Main
Deck.main = {};
Deck.main.cards = [];
Deck.main.category = false;

Deck.main.setCategory = (range_id, range_description) => {
	Deck.main.category = range_id;
	document.getElementById("deck-main-category").innerHTML = "Todas as cartas";
	if(range_id) { document.getElementById("deck-main-category").innerHTML = range_description };
};

Deck.main.render = (switchTo, fromDeck) => {
	let deckBox = document.getElementById('deck-main');
	deckBox.innerHTML = "";

	Deck.main.cards = lib.sort(Deck.main.cards, 'code', 'ASC');

	for(let i in Deck.main.cards) {
		if(Deck.main.category) {
			Deck.main.cards[i].range_id == Deck.main.category && Card.draw(deckBox, Deck.main.cards[i], switchTo, fromDeck);
		} else {
			Card.draw(deckBox, Deck.main.cards[i], switchTo, fromDeck);
		}
	};

	Menu.render();
};

Deck.main.filter = (range_id, range_name) => {
	Deck.main.setCategory(range_id, range_name);
	Deck.main.render('Card.switchToMain');
};