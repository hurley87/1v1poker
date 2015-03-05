Template.nav.events({
	'click .logout':function(evt, template) {
		evt.preventDefault();
		Meteor.logout();
	}
});