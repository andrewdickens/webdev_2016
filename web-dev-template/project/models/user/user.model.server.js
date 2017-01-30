/**
 * Created by andrewdickens on 11/19/16.
 */
module.exports = function () {
    console.log("in user.model.server");

    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server.js")();
    var UserModel = mongoose.model("UserModel", UserSchema);
    var model = {};

    var api = {
        createUser:createUser,
        setModel: setModel,
        findUsersByCredentials:findUsersByCredentials,
        getAllUsers: getAllUsers,
        promoteAdmin: promoteAdmin,
        demoteAdmin: demoteAdmin,
        updateUsername:updateUsername,
        findUserById: findUserById,
        isAdmin: isAdmin,
        findUserByGoogleId:findUserByGoogleId,
        findUserByFacebookId:findUserByFacebookId,
        deleteUser: deleteUser
    };
    return api;

    function deleteUser(userId){
        return UserModel.remove({_id:userId});
    }

    function findUserByFacebookId(facebookId){
        return UserModel.findOne({facebookId:facebookId});
    }
    function findUserByGoogleId(googleId){
        return UserModel.findOne({googleId:googleId});
    }
    function isAdmin(user){
        return UserModel.findOne({_id:user._id});
    }
    function findUserById(userId){
        return UserModel.findOne({_id:userId});
    }
    function updateUsername(payload){
        return UserModel.update({_id:payload.user._id}, {username:payload.user.username, firstName:payload.user.firstName, lastName:payload.user.lastName, emailAddress:payload.user.emailAddress});
    }

    function demoteAdmin(user){

        return UserModel.update({_id:user._id}, {admin:false});
    }

    function promoteAdmin(user){

        return UserModel.update({_id:user._id}, {admin:true});
    }

    function getAllUsers(){
        return UserModel.find();
    }

    function findUsersByCredentials(user){
        return UserModel.findOne({username: user.username, password:user.password});
    }
    
    function createUser(user){
        return UserModel.create(user);
    }

    function setModel(_model) {
        model = _model;
    }

};