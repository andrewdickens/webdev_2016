/**
 * Created by andrewdickens on 12/11/16.
 */

module.exports = function () {
    console.log("in feature.schema.server");

    var mongoose = require("mongoose");

    var FeatureRanksSchema = mongoose.Schema(
        {category: String,
            version: String,
            rank: []
        },
        {collection: 'featureNames'});
    return FeatureRanksSchema;
};