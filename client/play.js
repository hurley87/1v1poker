Template.status.events({
	'click .dgame': function(evt, template) {
		var game = Games.findOne({ _id: template.data._id });
		Games.remove(game._id);
	}
});

Template.status.helpers({
	firstPlayer: function() {
		return Meteor.users.find({ _id: Meteor.userId()}).fetch()[0];
	},
	otherPlayer: function() {
		var otherId = _.reject(this.currentTurn, function(id) { return id == Meteor.userId(); })[0];
		return Meteor.users.find({ _id: otherId}).fetch()[0];
	},
	email: function() {
		var answer = Meteor.call('facebook_email', Meteor.userId(), function(error, result) {
			if (error) {
				console.log('there was an error');
			} else {
				Session.set('facebook_email', result);
			}
		});	
		var answer = Session.get('facebook_email');
		return answer;
	}
});
Template.registerHelper("log", function(something) {
  console.log(something);
});

Template.board.helpers({
	flop: function() {
		return [this.deck.pop(), this.deck.pop(), this.deck.pop()];
	},
	turn: function() {
		return [this.deck.pop()];
	},
	river: function() {
		return [this.deck.pop()];
		console.log(this.deck)
	}
});	

Template.boardCard.helpers({
	theSuit: function() {
		var text = this.suit;
		var decoded = $('<div/>').html(text).text();
		return decoded;
	},
	cardRed: function() {
		if (this.suit == '&#9829;' || this.suit == '&#9830;') return 'cardRed';
	}
});

Template.myHand.helpers({
	myHand: function() {
		return _.where(this.players, { _id: Meteor.userId() })[0].hand;
	}
});