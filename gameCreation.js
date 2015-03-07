Games = new Meteor.Collection('games');

if(Meteor.isServer) {
	Meteor.publish('games', function() {
		return Games.find({ currentTurn: this.userId });
	});

	Meteor.publish('users', function() {
		return Meteor.users.find();
	});
}

if(Meteor.isClient) {
	Meteor.subscribe('games');
	Meteor.subscribe('users');
	Meteor.subscribe('games-count');

}

Games.allow({
	update: function() {
		return true;
	},
	remove: function() {
		return true;
	}
});


GameFactory = {};

GameFactory.createGame = function(playerIds) {
	var deck = createDeck();
	var	players = createPlayers(playerIds);

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
            players[id].hand.push(deck.shift());
        });
    }
};

function createPlayers(ids) {
	var o = [];

	ids.forEach(function(id){
		player = {
			_id: id,
			hand: [],
			dealer: false
		};
		o.push(player);
	});

	return o;
}

function createDeck() {
	var suits = ['&#9824;', '&#9827;', '&#9829;', '&#9830;'];
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