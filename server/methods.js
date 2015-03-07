Meteor.methods({
  // braintree
  // getClientToken: function (clientId) {
  //   var generateToken = Meteor.wrapAsync(gateway.clientToken.generate, gateway.clientToken);
  //   var options = {};

  //   if (clientId) {
  //     options.clientId = clientId;
  //   }

  //   var response = generateToken(options);

  //   return response.clientToken;
  // },
  // createTransaction: function (data) {
  //   var transaction = Meteor.wrapAsync(gateway.transaction.sale, gateway.transaction);
  //   // this is very naive, do not do this in production!
  //   var amount = parseInt(data.quantity, 10) * 100;

  //   var response = transaction({
  //     amount: amount,
  //     paymentMethodNonce: data.nonce,
  //     customer: {
  //       firstName: data.firstName
  //     }
  //   });

    // ...
    // perform a server side action with response
    // ...

  //   return response;
  // },
  createGame: function(otherPlayerId) {
  	var game =  GameFactory.createGame([Meteor.userId(), otherPlayerId]);
  	Games.insert(game);
  },
  facebook_email: function(id) {
    var userEmail = Meteor.users.find({ _id: id}).fetch()[0].profile.email;
    if (userEmail == null) {
      return 'No email'
    } else {
      return userEmail;
    }
  },
  sendEmail: function(email) {
    Email.send({to:email, from:'dhurls99@gmail.com', subject:'Thank you for signing up for our project', text:'We will share with you some news about us in a near future. See you soon!'});
  },
  updateEmail: function(id, email) {
    var user = Meteor.users.find({ _id: id}).fetch();
    Meteor.users.update({ _id:id }, { $set:{"profile.email": email} })
  }
});
