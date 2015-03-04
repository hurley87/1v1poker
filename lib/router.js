Router.configure({
	layoutTemplate: 'layout'
});	

Router.map(function() {
	this.route('home', { path: '/'});
	this.route('play', { 
		path: '/game/:id',
		data: function() {
			if(this.ready()){
				var game = Games.findOne({ _id: this.params.id });

				if (game) {
					game.yourTurn = game.currentTurn[0] === Meteor.userId()

					var myId = Meteor.userId();
					game.user = game.players[myId];			
					game.user.hand = game.user.chest

					var otherId = game.currentTurn[game.yourTurn ? 1 : 0];
					game.otherPlayer = {
						username: Meteor.users.findOne(otherId).username,
						score: game.players[otherId].score,
						hand: game.players[otherId].chest
					};

					game.decisionCard = game.deck[0];
				} else {
					Router.go('/');
				}
				

				return game;
			} else{
		     this.render('loading');
		    }
		}
	});
});	