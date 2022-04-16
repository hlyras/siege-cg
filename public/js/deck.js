const Deck = {};
Deck.category;

Deck.collection = {};
Deck.collection.cards = [];
Deck.collection.category = false;

Deck.collection.render = (switchTo, fromDeck) => {
	let deckBox = document.getElementById('deck-collection');
	deckBox.innerHTML = "";

	Deck.collection.cards = lib.sort(Deck.collection.cards, 'id', 'ASC');

	for(let i in Deck.collection.cards) {
		if(Deck.collection.category) {
			Deck.collection.cards[i].range == Deck.collection.category && Card.draw(deckBox, Deck.collection.cards[i], switchTo, fromDeck);
		} else {
			Card.draw(deckBox, Deck.collection.cards[i], switchTo, fromDeck);
		}
	};
};

Deck.main = {};
Deck.main.cards = [];
Deck.main.category = false;

Deck.main.render = (switchTo, fromDeck) => {
	let deckBox = document.getElementById('deck-main');
	deckBox.innerHTML = "";

	Deck.main.cards = lib.sort(Deck.main.cards, 'id', 'ASC');

	for(let i in Deck.main.cards) {
		if(Deck.main.category) {
			Deck.main.cards[i].range == Deck.main.category && Card.draw(deckBox, Deck.main.cards[i], switchTo, fromDeck);
		} else {
			Card.draw(deckBox, Deck.main.cards[i], switchTo, fromDeck);
		}
	};
};