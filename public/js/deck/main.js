Deck.render = (deck, box, switchTo, fromDeck) => {
	let deckbox = document.getElementById(box);
	deckbox.innerHTML = "";

	let cards = lib.sort(deck, 'code', 'ASC');

	for(let i in cards) {
		Card.draw(deckbox, cards[i], switchTo, fromDeck);
	};
};

// Collection
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
};

Deck.main.filter = (range_id, range_name) => {
	Deck.main.setCategory(range_id, range_name);
	Deck.main.render('Card.switchToMain');
};