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

Card.list = async () => {
	let response = await fetch("/card/list");
	response = await response.json();
	
	if(API.verifyResponse(response)){ return false };
	
	return response.cards;
};

Card.filter = async (empire_id) => {
	let response = await fetch("/card/filter/"+empire_id);
	response = await response.json();
	
	if(API.verifyResponse(response)){ return false };
	
	return response;
};

// Card.findById = async (id) => {
// 	let response = await fetch("/card/id/" + id);
// 	response = await response.json();
	
// 	if(API.verifyResponse(response)){ return false };
	
// 	return response.card[0];
// };