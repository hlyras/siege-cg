const Deck = {};

Deck.main = {};

Deck.main.add = (card_id) => {
	let query = `INSERT INTO siege.deck_main (card_id) VALUES (${card_id});`;
	return db(query);
};

Deck.main.remove = () => {
	let query = `INSERT INTO siege.deck_main (card_id) VALUES (${card_id});`;
};

