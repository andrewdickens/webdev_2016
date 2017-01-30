/**
 * Created by andrewdickens on 11/19/16.
 */

module.exports = function () {
    console.log("in feature.schema.server");

    var mongoose = require("mongoose");

    var DatabaseNamesSchema = mongoose.Schema(
        {
            lowercaseName: String,
            uppercaseName: String
        },
        {collection: 'databaseNames'});
    return DatabaseNamesSchema;
};
