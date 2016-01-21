Meteor.methods({
  editUser(userId, options) {
    check(userId, String);
    check(options, {
      username: String,
      password: Match.OneOf({ digest: String, algorithm: "sha-256" }, ""),
      email: String
    });

    // edit username
    if (options.username) {
      let result = Accounts.findUserByUsername(options.username);
      if (result) {
        if (result._id !== userId) {
          // username already exists
          throw new Meteor.Error("username-exists", "Username already exists");
        }
      } else {
        // No user exists with this username. Safe to edit.
        Accounts.setUsername(userId, options.username);
      }
    } else {
      // username is empty
      throw new Meteor.Error("username-empty", "Username cannot be empty");
    }

    // edit password
    if (options.password) {
      Accounts.setPassword(userId, options.password);
    }

    // edit email
    if (options.email) {
      let user = Users.findOne(userId);
      let emails = (user && user.emails) || [];

      // remove existing emails so that only one email is stored for each user
      emails.forEach(function (email) {
        Accounts.removeEmail(userId, email.address);
      });

      // add new email
      Accounts.addEmail(userId, options.email);
    }

    return true;
  }
});
