/**
 * Created by andrewdickens on 12/4/16.
 */
module.exports = function () {
    console.log("in project model.server");

    var mongoose = require('mongoose');
    // mongoose.connect('mongodb://localhost/webDev-project');
    mongoose.connect('mongodb://user:user@ds133158.mlab.com:33158/webdevfinal');

    var contentModel = require("./content/content.model.server.js")();
    var featureModel = require("./feature/feature.model.server.js")();
    var userModel = require("./user/user.model.server.js")();
    var featureNameModel = require("./feature/featureNames.model.server")();
    var databaseNamesModel = require("./feature/databaseNames.model.server")();
    var featureRanksModel = require("./feature/featureRanks.model.server")();


    var model = {
        featureModel: featureModel,
        userModel: userModel,
        contentModel: contentModel,
        featureNameModel: featureNameModel,
        databaseNamesModel:databaseNamesModel,
        featureRanksModel:featureRanksModel
    };

    featureModel.setModel(model);
    userModel.setModel(model);
    contentModel.setModel(model);
    featureNameModel.setModel(model);
    databaseNamesModel.setModel(model);
    featureRanksModel.setModel(model);

    return model;

};