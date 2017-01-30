/**
 * Created by andrewdickens on 11/19/16.
 */

module.exports = function () {
    console.log("in content.schema.server");

    var mongoose = require("mongoose");

    var ContentSchema = mongoose.Schema(
        {placementName: String,
            content: String},
        {collection: 'Content'});
    return ContentSchema;
};