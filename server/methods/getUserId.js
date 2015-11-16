Meteor.methods({
  getUserId: function (username) {
    check(username, String);
    user = Users.findOne({ username: username });
    if (user && user._id) {
      return (user._id);
    } else {
      throw new Meteor.Error("user-not-found", username + " not found in the database.");
    }
  }
});
