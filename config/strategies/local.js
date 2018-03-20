var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var User = require('mongoose').model('user')

module.exports = function() {
    passport.use(new LocalStrategy(
        function(username, password, done) { // Verify callback
            User.getUserByUsername(username, function(err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, {
                        message: 'Unknown User'
                    });
                }
                User.comparePassword(password, user.salt, function(err, isMatch) {
                    if (err) {
                        return err;
                    }
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, {
                            message: 'Invalid password'
                        });
                    }
                });


            });
        }));
}