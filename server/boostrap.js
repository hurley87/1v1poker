ServiceConfiguration.configurations.remove({
    service: 'facebook'
});
 
ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '1407855689520970',
    secret: '52d8621bf2a23b9523e2a9848886daa6'
});

Accounts.onCreateUser(function(options,user) {
  check(options, Object);
  check(user, Object);

  options.profile.email = user.services.facebook.email;
  options.profile.facebookId = user.services.facebook.id;
  options.profile.profile_img = 'http://graph.facebook.com/' + user.services.facebook.id + "/picture/?type=large";
  user.profile = options.profile;

  return user;
});