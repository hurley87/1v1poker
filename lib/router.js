Router.configure({
	layoutTemplate: 'layout'
});	


Router.route('/', {
	template: 'home'
});

Router.route('/game/:id', {
	template: 'play',
	data: function() {
		return Games.findOne({ _id: this.params.id });
	}
});

Router.route('tutorial', {
	template: 'tutorial'
});