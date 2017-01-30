/**
 * Created by andrewdickens on 11/19/16.
 */

module.exports = function () {
    console.log("in feature.schema.server");

    var mongoose = require("mongoose");

    var FeatureNameSchema = mongoose.Schema(
        {lowercaseName: String,
        uppercaseName: String
        },
        {collection: 'featureNames'});
    return FeatureNameSchema;
};
