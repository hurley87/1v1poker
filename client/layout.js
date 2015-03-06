Template.nav.events({
	'click .logout':function(evt, template) {
		evt.preventDefault();
		Meteor.logout();
	},
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

Template.footer.events({
	'click .logout':function(evt, template) {
		evt.preventDefault();
		Meteor.logout();
	},
	'click .modal-trigger': function(evt, template) {
		evt.preventDefault();
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
