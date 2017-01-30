/**
 * Created by andrewdickens on 12/11/16.
 */
module.exports = function () {
    console.log("in feature.model.server");

    var mongoose = require("mongoose");
    var FeatureRanksSchema = require("./featureRanks.schema.server")();
    var FeatureRanksModel = mongoose.model("FeatureRanksModel", FeatureRanksSchema);
    var model = {};
    
    var api ={
        setModel:setModel,
        getFeatureRanks:getFeatureRanks
    };
    return api;

    function getFeatureRanks(payload, backEndMappings){
        var returnValue = [];
        var i=0;

        // while(i<payload.featureOptions){
        //     var value = FeatureRanksModel.find(ranks.backEndMappings:payload[i])
        // }
        FeatureRanksModel
    }

    function setModel(_model) {
        model = _model;
    }
};