Card.switchToCollection = async (card_id) => {
	let response = await API.response(Player.deck.remove, card_id);
	if(!response) { return false; }

	for(let i in Deck.main.cards) {
		Deck.main.cards[i].id == card_id && Deck.collection.cards.push(Deck.main.cards[i]);
		Deck.main.cards[i].id == card_id && Deck.main.cards.splice(i, 1);
	};

	Deck.collection.render('Card.switchToMain');
	Deck.main.render('Card.switchToCollection');
};

Card.switchToMain = async (card_id) => {
	let response = await API.response(Player.deck.add, card_id);
	if(!response) { return false; }

	for(let i in Deck.collection.cards) {
		Deck.collection.cards[i].id == card_id && Deck.main.cards.push(Deck.collection.cards[i]);
		Deck.collection.cards[i].id == card_id && Deck.collection.cards.splice(i, 1);
	};

	Deck.collection.render('Card.switchToMain');
	Deck.main.render('Card.switchToCollection');
};

Deck.render = async () => {
	let empires = await API.response(Empire.list);
	if(!empires) { return alert("Ocorreu um erro, por favor recarregue a página.")}
	
	let player_deck = await API.response(Player.deck.get);
	if(!player_deck) { return false; }

	Empire.render(empires, player_deck.empire_id - 1, "empire-carousel");
};

Deck.render();