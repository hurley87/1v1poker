Template.status.events({
	'click .dgame': function(evt, template) {
		var game = Games.findOne({ _id: template.data._id });
		Games.remove(game._id);
	}
});

Template.play.helpers({
	
});