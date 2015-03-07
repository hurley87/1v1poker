
Template.chat.helpers({
	messages: function() {
		var gameId = this._id;
		var myId = Meteor.userId();
		var otherId = _.reject(this.currentTurn, function(id) { return id == Meteor.userId(); })[0];

		return Messages.find({ game_id: this._id}, { sort: { time: -1 }});
	},
	timeSent: function() {
		var time = moment(this.time).fromNow();
		return time;
	}
});

Template.chat.events({
	'keydown input#message': function(evt, template) {
		var name = Meteor.users.findOne(Meteor.userId()).profile.name;
		var otherId = _.reject(this.currentTurn, function(id) { return id == Meteor.userId(); })[0];
		var otherName = Meteor.users.findOne(otherId).profile.name;
		console.log(this);
		if(event.which == 13) {
			var sender = Meteor.users.findOne(Meteor.userId());
		    var recipient = Meteor.users.findOne(otherId);
		    var message = $('#message').val();
			
			Messages.insert({
	          sender: sender,
	          recipient: recipient,
	          message: message,
	          time: Date.now(),
	          game_id: this._id
	        });	

	        $('#message').val('');
	        message.value = '';	
		}
	}
});	
