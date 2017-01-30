/**
 * Created by andrewdickens on 11/19/16.
 */

module.exports = function () {
    console.log("in feature.schema.server");

    var mongoose = require("mongoose");

    var FeatureSchema = mongoose.Schema(
        {
            category: String,
            feature: String,
            backEndMapping: String
        },
        {collection: 'featureCategories'});
    return FeatureSchema;
};
