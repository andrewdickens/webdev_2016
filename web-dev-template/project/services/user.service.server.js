/**
 * Created by andrewdickens on 12/8/16.
 */
module.exports = function (app, model) {
    console.log("In project user.service.server");

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;


    var cookieParser = require('cookie-parser');
    var session = require('express-session');

    var googleConfig = {
        clientID: '252994211937-2i7m7a8v58m94fj36g3a0qv2b23hkdjj.apps.googleusercontent.com',
        clientSecret: 'hPryjWy8SR99FS8YC9ElpgzO',
        callbackURL: '/auth/google/callback'
    };

    var facebookConfig = {
        clientID        : '133487900472823',
        clientSecret    : 'a8c3ff90cf1e99b544d56aa8541c478a',
        callbackURL     : '/auth/facebook/callback'
    };

    app.use(session({
        secret: 'this is the secret',
        resave: true,
        saveUninitialized: true
    }));

    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
    passport.use(new GoogleStrategy(googleConfig, googleStrategy));
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));


    app.post("/api/login", passport.authenticate('local'), login);
    app.post("/api/register", register);
    app.get("/api/getAllUsers", getAllUsers);
    app.post("/api/promoteAdmin", promoteAdmin);
    app.post("/api/demoteAdmin", demoteAdmin);
    app.post("/api/updateUsername", updateUsername);
    app.get("/api/isAdmin", isAdmin);
    app.delete("/api/deleteuser/:uid", deleteUser);
    app.get("/api/getCurrentUser", getCurrentUser);
    app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/project/index.html#/intro',
            failureRedirect: '/project/index.html#/login'
        }));

    app.get   ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/project/index.html#/intro',
            failureRedirect: '/project/index.html#/login'
        }));

    function getCurrentUser(req, res){
        var user = req.user;
        console.log(user);

        return model.userModel
            .findUserById(user._id)
            .then(function(user){
                res.send(user)
            });
    }

    function deleteUser(req, res){
        var userId = req.params.uid;
        
        return model.userModel
            .deleteUser(userId)
            .then(function(){
                res.send(200);
            })
    }
    function googleStrategy(token, refreshToken, profile, done) {
        model.userModel
            .findUserByGoogleId(profile.id)
            .then(
                function (user) {
                    if (user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username: emailParts[0],
                            firstName: profile.name.givenName,
                            lastName: profile.name.familyName,
                            admin: false,
                            email: email,
                            google: {
                                id: profile.id,
                                token: token
                            },
                            googleId: profile.id
                        };
                        return model.userModel.createUser(newGoogleUser);
                    }
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            )
            .then(
                function (user) {
                    return done(null, user);
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function facebookStrategy(token, refreshToken, profile, done) {
        model.userModel
            .findUserByFacebookId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var names = profile.displayName.split(" ");
                        var newFacebookUser = {
                            lastName:  names[1],
                            firstName: names[0],
                            email:     profile.emails ? profile.emails[0].value:"",
                            admin: false,
                            facebook: {
                                id:    profile.id,
                                token: token
                            },
                            facebookId: profile.id
                        };
                        return model.userModel.createUser(newFacebookUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    function isAdmin(req, res) {
        var user = req.user;

        model.userModel
            .isAdmin(user)
            .then(function (user) {
                res.send(user.admin);
            });
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        model.userModel
            .findUserById(user._id)
            .then(function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                });
    }

    function localStrategy(username, password, done) {

        model.userModel
            .findUsersByCredentials({username: username, password: password})
            .then(function (user) {

                    if (!user) {
                        return done(null, false);
                    }
                    return done(null, user);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function updateUsername(req, res) {
        console.log("in demote admin server");

        payload = req.body;

        return model.userModel
            .updateUsername(payload)
            .then(function () {
                res.send(200);
            });
    }

    function demoteAdmin(req, res) {
        console.log("in demote admin server");

        user = req.body;

        console.log(user._id);

        return model.userModel
            .demoteAdmin(user)
            .then(function () {
                res.send(200);
            });
    }

    function promoteAdmin(req, res) {
        console.log("in promote admin server");

        user = req.body;

        console.log(user._id);

        return model.userModel
            .promoteAdmin(user)
            .then(function () {
                res.send(200);
            });
    }

    function getAllUsers(req, res) {
        console.log("in getAllUsers Service.server");

        return model.userModel
            .getAllUsers()
            .then(function (users) {
                console.log(users);
                res.send(users);
            })
    }

    function register(req, res) {
        var user = req.body;
        user.firstName = null;
        user.lastName = null;
        user.emailAddress = null;
        model.userModel
            .createUser(user)
            .then(function (newUser) {
                    res.send(newUser)

                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
    }

};
