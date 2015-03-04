Template.loggedIn.events({
	'click .logout':function(evt, template) {
		evt.preventDefault();
		Meteor.logout();
	}
});

Template.notLoggedIn.events({
	'click .facebookLogin': function(evt, template) {
		evt.preventDefault();
		Meteor.loginWithFacebook();
	}
});

Template.userList.helpers({
	users: function() {
		var myid = Meteor.userId();
		var cantPlayAgainst = [myid];

		Games.find({ inProgress: true }).forEach(function(game) {
			cantPlayAgainst.push(otherId(game));
		});

		return Meteor.users.find({ _id: { $not: { $in: cantPlayAgainst }}});
	}
});

Template.userItem.events({
    'click button': function (evt, template) {
        Meteor.call('createGame', template.data._id);
    }
});

function otherId(game) {
	return game.currentTurn[game.currentTurn[0] === Meteor.userId() ? 1 : 0];
}

Template.gameList.helpers({
	games: function () {
        return Games.find({ inProgress: true }).map(function (game) {
            game.otherPlayer = Meteor.users.findOne(otherId(game)).username;
            game.started = moment(game.started).fromNow();
            if (game.players[Meteor.userId()].dealer == true) {
            	game.dealer = false;
            } else {
            	game.dealer = true;
            }
            return game;
        });
    }
});
