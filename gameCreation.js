GameFactory = {};

GameFactory.createGame = function(playerIds) {
	var deck = createDeck();
	var	players = createPlayers(playerIds);
	var dealer = Meteor.userId();
	players[dealer].dealer = true;

	GameFactory.dealPlayers(players, deck);	

	return {
		deck: deck,
		players: players,
		currentTurn: playerIds,
		inProgress: true,
		started: new Date()
	};
};

GameFactory.dealPlayers = function (players, deck) {
    for (var i = 0; i < 2; i++) {
        Object.keys(players).forEach(function (id) {
            players[id].chest.push(deck.shift());
        });
    }
};

function createPlayers(ids) {
	var o = {};

	ids.forEach(function(id){
		o[id] = {
			hand: [],
			dealer: false,
			score: {
				points: 0
			}
		};
	});

	return o;
}

function createDeck() {
	var suits = ['clubs', 'spades', 'diamonds', 'hearts'];
	var cards = [];

	suits.forEach(function(suit) {
		for(var i = 2; i <= 14; i++) {
			var name = i;
			if(i===14) name = 'A';
			if(i===11) name = 'J';
			if(i===12) name = 'Q';
			if(i===13) name = 'K';
			cards.push({
				suit: suit,
				value: i,
				name: name
			});
		}
	});

	return _.shuffle(cards);
}