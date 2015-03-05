Router.configure({
	layoutTemplate: 'layout'
});	


Router.route('/', {
	template: 'home'
});
Router.route('/game/:id', {
	template: 'play',
	data: function() {
		var game = Games.findOne({ _id: this.params.id });

		if (game) {

		} else {
			Router.go('/');
		}

		return game;
	}
});