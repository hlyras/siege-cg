const Card = {};

Card.save = async (card) => {
	let response = await fetch("/card/save", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify(card)
	});
	response = await response.json();

	if(API.verifyResponse(response)){ return false };
	alert(response.done);

	return response;
};

Card.filter = async (card) => {
	let cards = await fetch("/card/filter", {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
	    body: JSON.stringify(card)
	});
	cards = await cards.json();

	if(API.verifyResponse(cards)){ return false };

	return cards;
};

Card.findById = async (card_id) => {
	let response = await fetch("/card/findById/"+card_id);
	response = await response.json();
	
	if(API.verifyResponse(response)){ return false };
	
	return response[0];
};

Card.list = async () => {
	let response = await fetch("/card/list");
	response = await response.json();
	
	if(API.verifyResponse(response)){ return false };
	
	return response.cards;
};

Card.findByEmpireId = async (empire_id) => {
	let response = await fetch("/card/findByEmpire/"+empire_id);
	response = await response.json();
	
	if(API.verifyResponse(response)){ return false };
	
	return response;
};