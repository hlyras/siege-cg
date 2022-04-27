const Leader = {};

Leader.findByEmpireId = async (empire_id) => {
	let response = await fetch("/leader/findByEmpire/"+empire_id);
	response = await response.json();
	
	if(API.verifyResponse(response)){ return false };
	
	return response;
};