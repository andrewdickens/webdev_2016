module.exports = function (app, model) {
    var passport = require('passport');
    var cookieParser = require('cookie-parser');
    var session = require('express-session');
    var LocalStrategy = require('passport-local').Strategy;
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    var bcrypt = require("bcrypt-nodejs");
    var FacebookStrategy = require('passport-facebook').Strategy;

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

    console.log("In feature.service.server");

    var users = [
        {_id: 123, username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
        {_id: 234, username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
        {_id: 345, username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
        {_id: 456, username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    ];

    app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/api/user', FindUser);
    app.get('/api/user/:uid', FindUserByID);
    app.put('/api/user/:userId', updateUser);
    app.delete('/api/user/:userId', deleteUser);
    app.post('/api/login', passport.authenticate('local'), login);
    app.post('/api/checkLogin', checkLogin);
    app.post('/api/logout', logout);
    app.post('/api/user', createUser);

    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/assignment/index.html#/user',
            failureRedirect: '/assignment/index.html#/login'
        }));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/assignment/index.html#/user',
            failureRedirect: '/assignment/index.html#/login'
        }));

    var googleConfig = {
        clientID: '252994211937-5u5bf3g7e9stv6rued428320984e3aso.apps.googleusercontent.com',
        clientSecret: 'yV1vdu7lMUVCXsjBg0_CqMN2',
        callbackURL: '/auth/google/callback'
    };

    var facebookConfig = {
        clientID     : '1290631784342301',
        clientSecret : 'e70bcc0ce4a377caf9fdddfa97526535',
        callbackURL  : '/auth/facebook/callback'
    };

    passport.use(new GoogleStrategy(googleConfig, googleStrategy));

    function googleStrategy(token, refreshToken, profile, done) {
        console.log(profile);

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

    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

    function facebookStrategy(token, refreshToken, profile, done) {
        model.userModel
            .findUserByFacebookId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        console.log("in done [top}");
                        console.log(user);
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
            );
            // .then(
            //     function(user){
            //         console.log("user in done!!!");
            //         console.log(user);
            //         return done(null, user);
            //     },
            //     function(err){
            //         if (err) { return done(err); }
            //     }
            // );
    }

    function logout(req, res) {
        req.logout();
        res.send(200);
    }

    function checkLogin(req, res) {
        console.log("in checkLogin [server]");

        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        model.userModel
            .findUserById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (error) {
                    done(error, null);
                }
            )
    }

    function localStrategy(username, password, done) {
        console.log("in local strategy");

        model.userModel
            .findUserByUsername(username)
            .then(function (user) {
                console.log("in succcess callback");
                    if (!user) {
                        console.log(user);
                        console.log("in first if");
                        return done(null, false);
                    }else if(user){
                        if(user && bcrypt.compareSync(password, user.password)) {
                            return done(null, user);
                        } else {
                            return done(null, false);
                        }
                    }
                console.log("in second if");
                    return done(null, user)
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function login(req, res) {

        var user = req.user;
        console.log("************************");
        console.log(user);
        res.json(user);
    }

    function updateUser(req, res) {
        var user = req.body;
        var uid = req.params.userId;

        model
            .userModel
            .updateUser(uid, user)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;

        model
            .userModel
            .removeUser(userId)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function createUser(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        model.userModel
            .createUser(user)
            .then(
                function (newUser) {
                    console.log("new feature is " + newUser);
                    res.send(newUser);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
        // res.send(feature);
    }

    function FindUserByID(req, res) {
        // console.log(req.user);
        // var userId = req.user._id;
        console.log(req.body);
        console.log(req.user);
        model
            .userModel
            .findUserById(req.params.uid)
            .then(
                function (user) {
                    if (user) {
                        res.send(user);
                    } else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function FindUser(req, res) {
        console.log("in FindUser");
        console.log(req.user);
        var query = req.query;

        if (query.password && query.username) {
            findUserByCredentials(req, res)
        } else if (query.username) {
            findUserByUsername(req, res)
        } else res.json(req.user);
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        for (var u in users) {
            if (users[u].username === username) {
                res.send(users[u]);
                return;
            }
        }
        return "0";
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        model.userModel
            .findUsersByCredentials(username, password)
            .then(
                function (users) {
                    if (users) {
                        console.log(users[0]);
                        res.json(users[0]);
                    } else (
                        res.send('0')
                    )
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }
};
