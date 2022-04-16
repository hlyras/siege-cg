Deck.collection.filter = (category) => {
	Deck.collection.category = category;
	Deck.collection.render('Card.switchToMain');
};

Deck.main.filter = (category) => {
	Deck.main.category = category;
	Deck.main.render('Card.switchToCollection');
};

Card.switchToCollection = (card_id) => {
	for(let i in Deck.main.cards) {
		Deck.main.cards[i].id == card_id && Deck.collection.cards.push(Deck.main.cards[i]);
		Deck.main.cards[i].id == card_id && Deck.main.cards.splice(i, 1);
	};

	Deck.collection.render('Card.switchToMain');
	Deck.main.render('Card.switchToCollection');
};

Card.switchToMain = (card_id) => {
	for(let i in Deck.collection.cards) {
		Deck.collection.cards[i].id == card_id && Deck.main.cards.push(Deck.collection.cards[i]);
		Deck.collection.cards[i].id == card_id && Deck.collection.cards.splice(i, 1);
	};

	Deck.collection.render('Card.switchToMain');
	Deck.main.render('Card.switchToCollection');
};


async function getCards() {
	const cards = await API.response(Card.list, '');
	if(!cards) { return false; }

	Deck.collection.cards = cards;

	Deck.collection.render('Card.switchToMain');
	Deck.main.render('Card.switchToCollection');
};

getCards();