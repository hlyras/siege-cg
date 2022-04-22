const Deck = {};

Deck.collection = {};
Deck.collection.cards = [];
Deck.collection.category = false;

Deck.main = {};
Deck.main.cards = [];
Deck.main.category = false;

Deck.main.add = async (card) => {
	let response = await fetch("/deck/main/add", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify(card)
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	alert(response.done);

	return response;
};

Deck.main.remove = async (card_id) => {
	let response = await fetch("/deck/main/remove/"+card_id, { method: 'DELETE' });
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	alert(response.done);
	
	return true;
};