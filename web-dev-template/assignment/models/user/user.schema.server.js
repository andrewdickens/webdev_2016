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
            first: String,
            last: String,
            email: String,
            phone: String,
            websites: [{type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteModel'}],
            dateCreated: Date,
            google: {
                id:  String,
                token: String,
                email: String
            },
            googleId: String,
            facebook: {
                id:    String,
                token: String
            },
            facebookId: String
        },
        {collection: "user"});
    return UserSchema;
};
