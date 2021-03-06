ServiceConfiguration.configurations.remove({
    service: 'facebook'
});
 
ServiceConfiguration.configurations.insert({
    service: 'facebook',
    // appId: Meteor.settings.facebook_id,
    // secret: Meteor.settings.facebook_secret
    appId: '731031777018485',
    secret: "0445f4116e4c3573dfaaa26f9a9c8051"
});

Accounts.onCreateUser(function(options,user) {
  check(options, Object);
  check(user, Object);

  var profile = options.profile;
  profile.email = user.services.facebook.email;
  profile.facebookId = user.services.facebook.id;
  profile.profile_img = 'http://graph.facebook.com/' + user.services.facebook.id + "/picture/?type=large";
  profile.bank = 10;
  profile.rank = 'Rookie';
  user.profile = options.profile;

  return user;
});

var gateway;

Meteor.startup(function () {
  var braintree = Meteor.npmRequire('braintree');

  gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    publicKey: Meteor.settings.BT_PUBLIC_KEY,
    privateKey: Meteor.settings.BT_PRIVATE_KEY,
    merchantId: Meteor.settings.BT_MERCHANT_ID
  });

  process.env.MAIL_URL = 'smtp://postmaster@sandbox9845065a1f4b4a94811faa76872abd41.mailgun.org:45oifdj0skgp9@smtp.mailgun.org:587';

});
