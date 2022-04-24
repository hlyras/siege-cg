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

Card.render = async (empire_id) => {
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

    Deck.collection.cards = cards;
    Deck.main.cards = player_cards;

    Deck.collection.render('Card.switchToMain');
    Deck.main.render('Card.switchToCollection');
};