/**
 * Created by andrewdickens on 11/19/16.
 */
module.exports = function () {
    console.log("in content.model.server");

    var mongoose = require("mongoose");
    var ContentSchema = require("./content.schema.server.js")();
    var ContentModel = mongoose.model("ContentModel", ContentSchema);
    var model = {};

    var api = {
        getContent:getContent,
        setModel: setModel,
        updateContent: updateContent
    };
    return api;

    function getContent(placementName){
        // console.log(ContentModel.findOne({placementName: placementName}));
        return ContentModel.findOne({placementName: placementName});
    }

    function setModel(_model) {
        model = _model;
    }

    function updateContent(payload){
        var placement = payload.placement;
        var content = payload.content;
        console.log(placement);
        console.log(content);

        return ContentModel.update({placementName: payload.placement}, {content: payload.content});
        }

};