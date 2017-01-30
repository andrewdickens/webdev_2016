/**
 * Created by andrewdickens on 11/19/16.
 */

module.exports = function () {
    console.log("in user.schema.server");

    var mongoose = require("mongoose");

    var UserSchema = mongoose.Schema(
        {
            username: String,
            password: String,
            firstName: String,
            lastName: String,
            emailAddress: String,
            admin: Boolean,
            googleId: String,
            facebookId: String
        },
        {collection: 'Users'});
    return UserSchema;
};
