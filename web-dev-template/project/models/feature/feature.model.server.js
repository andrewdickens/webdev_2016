/**
 * Created by andrewdickens on 11/19/16.
 */
module.exports = function () {
    console.log("in feature.model.server");

    var mongoose = require("mongoose");
    var FeatureSchema = require("./feature.schema.server.js")();
    var FeatureModel = mongoose.model("FeatureModel", FeatureSchema);
    var model = {};

    var api = {
        setModel: setModel,
        getFeatures: getFeatures,
        updateFeatureCategory:updateFeatureCategory,
        createFeatureOption:createFeatureOption,
        deleteFeatureOption:deleteFeatureOption,
        updateFeatureOption:updateFeatureOption
    };
    return api;

    function updateFeatureOption(payload){
        return FeatureModel.update({_id:payload._id}, {feature:payload.feature});
    }
    function createFeatureOption(payload){
        return FeatureModel.create({category:payload.category, feature:payload.feature});
    }
    
    function deleteFeatureOption(foid){
        return FeatureModel.remove({_id:foid});
    }
    
    function updateFeatureCategory(feature, oldFeatureName){
        return FeatureModel.update({category:oldFeatureName}, {category:feature.lowercaseName});
    }

    function getFeatures(feature){
        return FeatureModel.find({category: feature});
    }

    function setModel(_model) {
        model = _model;
    }
    
};