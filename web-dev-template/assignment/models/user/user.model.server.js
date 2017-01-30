/**
 * Created by andrewdickens on 11/19/16.
 */
module.exports = function () {
    console.log("in user.model.server");

    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var UserModel = mongoose.model("UserModel", UserSchema);
    var model = {};

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        updateUser: updateUser,
        findUsersByCredentials: findUsersByCredentials,
        removeUser: removeUser,
        setModel: setModel,
        findWebsitesForUser: findWebsitesForUser,
        findUserByUsername: findUserByUsername,
        findUserByGoogleId: findUserByGoogleId,
        findUserByFacebookId: findUserByFacebookId

    };
    return api;

    function findUserByFacebookId(facebookId) {
        return UserModel.findOne({facebookId: facebookId});
    }
    
    function findUserByGoogleId(googleId){
        return UserModel.findOne({googleId : googleId})
    }
    
    function findUserByUsername(username){
        return UserModel
            .findOne({username: username});
    }

    function findWebsitesForUser(userId) {
        return UserModel
            .findById(userId)
            .populate("websites")
            .exec();
    }

    function setModel(_model) {
        model = _model;
    }

    function removeUser(userId) {
        return UserModel
            .remove({_id: userId});
    }

    function findUsersByCredentials(username, password) {
        console.log("username is " + username + " and password is " + password);
        return UserModel.findOne({username: username, password: password});
    }

    function updateUser(userId, user) {
        return UserModel
            .remove({_id: userId})
            .create(user);
    }

    function createUser(user) {
        console.log("in createUser [feature.model.server.js]");

        return UserModel.create(user);
    }

    function findUserById(userId) {
        return UserModel.findById(userId);
    }
};