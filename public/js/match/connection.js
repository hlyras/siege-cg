const socket = io.connect();

socket.on('connected player', async data => {
	// let player = await API.response(Player.get);
	// if(!player) { return false; }
	console.log(data);
	
	// if token exists find room by the token and set join room to specific room (it allows reconect to the match) 
	let token = localStorage.getItem('siege-battle-token');

	socket.emit('join match', token);
});

// async function connectToServer() {
	// let player = await API.response(Player.get);
	// if(!player) { return false; }

	// console.log(player);

	// let token = localStorage.getItem('siege-battle-token');
	// if token exists find room by the token and set join room to specific room (it allows reconect to the match) 
	// console.log(token);

	// socket.emit('join room', { player});
	// then return token of the game
// };

// function joinRoom() {
// 	players = [];
// 	socket.emit('join room', player);
// 	GAMESTATE.loadGame();
// };

// connectToServer();