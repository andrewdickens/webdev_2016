/**
 * Created by andrewdickens on 11/19/16.
 */
module.exports = function () {
    console.log("in feature.model.server");

    var mongoose = require("mongoose");
    var FeatureNameSchema = require("./featureNames.schema.server")();
    var FeatureNameModel = mongoose.model("FeatureNameModel", FeatureNameSchema);
    var model = {};

    var api = {
        setModel: setModel,
        getFeatureNames: getFeatureNames,
        getLowercaseName:getLowercaseName,
        updateFeatureNames:updateFeatureNames,
        createFeatureName:createFeatureName,
        deleteFeatureName:deleteFeatureName,
        getBackEndMapping: getBackEndMapping
    };
    return api;
    
    function getBackEndMapping(frontEndMapping){
        return FeatureNameModel.find({feature:frontEndMapping}).backEndMapping;
    }
    function createFeatureName(payload) {
        return FeatureNameModel.create({lowercaseName: payload.lowercaseName, uppercaseName: payload.uppercaseName});
    }
    
    function deleteFeatureName(fid){
        return FeatureNameModel.remove({_id:fid});
    }

    function updateFeatureNames(feature){
        return FeatureNameModel.update({_id:feature._id}, {lowercaseName:feature.lowercaseName, uppercaseName:feature.uppercaseName});
    }
    function getLowercaseName(feature) {
        return FeatureNameModel.find({_id:feature._id}).lowercaseName;
    }
    function getFeatureNames(){
        return FeatureNameModel.find();
    }

    function setModel(_model) {
        model = _model;
    }

};