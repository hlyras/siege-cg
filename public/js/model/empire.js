const Empire = {};

Empire.get = async () => {
	let response = await fetch("/empire/get");
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	return response.empire;
};

Empire.list = async () => {
	let response = await fetch("/empire/list");
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	return response;
};

Empire.set = async (empire_id) => {
	let response = await fetch("/empire/set/" + empire_id);
	response = await response.json();

	if (API.verifyResponse(response)) { return false };

	return response;
};