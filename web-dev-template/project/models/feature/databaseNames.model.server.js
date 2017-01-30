/**
 * Created by andrewdickens on 11/19/16.
 */
module.exports = function () {
    console.log("in feature.model.server");

    var mongoose = require("mongoose");
    var DatabaseNamesSchema = require("./databaseNames.schema.server.js")();
    var DatabaseNamesModel = mongoose.model("DatabaseNamesModel", DatabaseNamesSchema);
    var model = {};

    var api = {
        setModel: setModel,
        getDatabases: getDatabases
    };
    return api;


    function getDatabases(){
        return DatabaseNamesModel.find();
    }

    function setModel(_model) {
        model = _model;
    }

};