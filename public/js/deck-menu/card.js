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