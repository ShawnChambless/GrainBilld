// var passport = require('passport'),
//     LocalStrategy   = require('passport-local').Strategy,
//     User            = require('../models/users/userModel');
//
// module.exports = function(passport) {
//
//     passport.serializeUser(function(user, done) {
//       done(null, user);
//     });
//     passport.deserializeUser(function(_id, done) {
//       User.findById(_id, function(err, user) {
//         done(err, user);
//       });
//     });
//
//     passport.use(new LocalStrategy({
//             usernameField: 'email',
//             passwordField: 'password',
//             session: true
//         },
//         function(email, password, done) {
//             process.nextTick(function() {
//                 User.findOne({
//                     email: email
//                 }, function(err, user) {
//                     if (err) {
//                         return done(err);
//                     }
//                     if (!user) {
//                         return done(null, false, {
//                             message: 'Unknown user or invalid password'
//                         });
//                     }
//                     if (!user.authenticate(password)) {
//                         return done(null, false, {
//                             message: 'Unknown user or invalid password'
//                         });
//                     }
//
//                     return done(null, user);
//                 });
//             });
//         }
//     ));
//
// }
