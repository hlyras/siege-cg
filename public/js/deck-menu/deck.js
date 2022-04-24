Deck.render = async () => {
	let empires = await API.response(Empire.list);
	if(!empires) { return alert("Ocorreu um erro, por favor recarregue a página.")}
	
	let player_deck = await API.response(Player.deck.get);
	if(!player_deck) { return false; }

	let leaders = await API.response(Leader.findByEmpireId, player_deck.empire_id);
    if(!leaders) { return alert("Ocorreu um erro, por favor recarregue a página."); }

    console.log(leaders);

	Empire.render(empires, player_deck.empire_id - 1, "empire-carousel");
    Leader.render(leaders, player_deck.leader_id - 1, "leader-carousel");
};