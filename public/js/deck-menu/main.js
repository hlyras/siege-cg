const Menu = {};

Menu.render = async () => {
	let info_box = document.getElementById("deck-info");
	info_box.innerHTML = "";

	info_box.append(lib.element.create("div", {
		class: "box b1 center lucida-grande em08 bold",
		style: "color:#f0f0f0"
	}, "Total de cartas no baralho"));

	info_box.append(lib.element.create("div", {
		class: "box b1 center lucida-grande bold",
		style: "color:#f0f0f0"
	}, Deck.info.totalCards() || "0"));

	info_box.append(lib.element.create("div", {
		class: "box b1 center lucida-grande em08 bold",
		style: "color:#f0f0f0"
	}, "Número de cartas de unidades"));

	info_box.append(lib.element.create("div", {
		class: "box b1 center lucida-grande bold",
		style: "color:#f0f0f0"
	}, Deck.info.unitCards() || "0"));

	info_box.append(lib.element.create("div", {
		class: "box b1 center lucida-grande em08 bold",
		style: "color:#f0f0f0"
	}, "Número de cartas especiais"));

	info_box.append(lib.element.create("div", {
		class: "box b1 center lucida-grande bold",
		style: "color:#f0f0f0"
	}, Deck.info.specialCards() || "0"));

	info_box.append(lib.element.create("div", {
		class: "box b1 center lucida-grande em08 bold",
		style: "color:#f0f0f0"
	}, "Número de heróis"));

	info_box.append(lib.element.create("div", {
		class: "box b1 center lucida-grande bold",
		style: "color:#f0f0f0"
	}, Deck.info.heroCards() || "0"));

	info_box.append(lib.element.create("div", {
		class: "box b1 center lucida-grande em08 bold",
		style: "color:#f0f0f0"
	}, "Poder do deck"));

	info_box.append(lib.element.create("div", {
		class: "box b1 center lucida-grande bold",
		style: "color:#f0f0f0"
	}, Deck.info.power() || "0"));
};

Menu.init = async () => {
	let empires = await API.response(Empire.list);
	if (!empires) { return alert("Ocorreu um erro, por favor recarregue a página.") }

	let player_deck = await API.response(Player.deck.get);
	if (!player_deck) { return false; }

	let leaders = await API.response(Leader.findByEmpireId, player_deck.empire_id);
	if (!leaders) { return false; }

	let player_leader = await API.response(Player.leader.get);
	if (!player_leader) { return false; }

	for (let i in leaders) {
		if (leaders[i].id == player_leader.leader_id) {
			player_leader.position = i;
		}
	}

	await Empire.render(empires, player_deck.empire_id - 1, "empire-carousel");
	await Leader.render(leaders, player_leader.position, "leader-carousel");
};

Menu.init();