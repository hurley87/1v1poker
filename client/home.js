

Template.loggedIn.events({ 
	'click .modal-trigger': function() {
		$('#modal1').openModal({
		      dismissible: true, // Modal can be dismissed by clicking outside of the modal
		      opacity: .5, // Opacity of modal background
		      in_duration: 300, // Transition in duration
		      out_duration: 200, // Transition out duration
		      ready: function() { console.log('Ready'); }, // Callback for Modal open
		      complete: function() { console.log('Closed'); } // Callback for Modal close
		    });
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
    'click .userItem': function (evt, template) {
        Meteor.call('createGame', template.data._id);
    }
});

function otherId(game) {
	return game.currentTurn[game.currentTurn[0] === Meteor.userId() ? 1 : 0];
}

Template.gameList.helpers({
	games: function () {
        return Games.find({ inProgress: true }).map(function (game) {
            // game.otherPlayer = Meteor.users.findOne(otherId(game)).username;
             game.started = moment(game.started).fromNow();
            return game;
        });
    },
    noGames: function() {
    	return 4;
    }
});
Template.gameItem.helpers({
	yourTurn: function() {
		var myId = Meteor.userId();
		var yourTurnId = this.currentTurn[0];

		if (myId == yourTurnId) {
			return true;
		} else {
			return false;
		}
	},
	otherPlayer: function() {
		var myId = Meteor.userId();
		var otherId = _.reject(this.currentTurn, function(id) { return id == myId; });
		var user = Meteor.users.find({ _id: otherId[0] }).fetch();
		return user[0].profile.name;
	}
});

Template.profile.helpers({
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

Template.profile.events({
	'click .updateEmailBtn': function(evt, template) {
		
		$('#updateEmailmodal').openModal({
	      dismissible: true, // Modal can be dismissed by clicking outside of the modal
	      opacity: .5, // Opacity of modal background
	      in_duration: 300, // Transition in duration
	      out_duration: 200, // Transition out duration
	      ready: function() { console.log('Ready'); }, // Callback for Modal open
	      complete: function() { console.log('Closed'); } // Callback for Modal close
	    });
	},
	'click #update-email-btn': function(evt, template) {
		evt.preventDefault();
		var email = $("#email").val();
		// Meteor.call('sendEmail', email, function() {
		// 	Router.go('/');
		// });
		$('.userEmail').text(email);
		Meteor.call('updateEmail', Meteor.userId(), email);
	}
});
