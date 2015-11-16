Meteor.methods({
  deleteUser: function (userId) {
    var result;
    check(userId, String);
    result = Users.remove({ _id: userId });
    return result;
  }
});
