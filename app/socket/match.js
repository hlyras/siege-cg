let Match = function() {
	this.id;
	players = [];
};

let matchs = [];

module.exports = {
	connection: (io) => {
		io.on('connection', (socket) => {
		  console.log('a user connected');

			socket.emit('connected player', { socket: socket.id });

		  socket.on('join match', token => {
		  	console.log(token);
		  	socket.room = 0;

		  	for(let i in matchs) {
		  		if(matchs[i].players.length == 0) {}
		  	};

		  	socket.join(socket.room, () => {

		  	});
		  	// if(token) { return 'Decodificar o token e encontrar a sala da partida' };

		  	// Se não existir salas cria uma e entra como player 1



		  	// Se existir salas procurar por salas com apenas 1 player
		  	// Se não existir salas com apenas 1 player cria uma nova sala
		  });

		  socket.on('disconnect', () => {
		    console.log('user disconnected');
		  });
		});
	}
}