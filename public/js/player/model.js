const Player = {};

Player.empire = {};

Player.empire.set = async (empire_id) => {
	let response = await fetch("/player/empire/set/"+empire_id);
	response = await response.json();
	
	if(API.verifyResponse(response)){ return false };
	
	return response;
};


Player.deck = {};

Player.deck.get = async (empire) => {
	let response = await fetch("/player/deck/get");
	response = await response.json();
	
	if(API.verifyResponse(response)){ return false };
	
	return response;
};

Player.deck.list = async (empire_id) => {
	let response = await fetch("/player/deck/list/"+empire_id);
	response = await response.json();
	
	if(API.verifyResponse(response)){ return false };
	
	return response;
};

Player.deck.add = async (card_id) => {
	let response = await fetch("/player/deck/add/"+card_id);
	response = await response.json();
	
	if(API.verifyResponse(response)){ return false };
	
	return response;
};

Player.deck.remove = async (card_id) => {
	let response = await fetch("/player/deck/remove/"+card_id);
	response = await response.json();
	
	if(API.verifyResponse(response)){ return false };
	
	return response;
};