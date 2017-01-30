/**
 * Created by andrewdickens on 12/4/16.
 */
module.exports = function (app, model) {

    console.log("in project feature.service.server.js");

    app.get("/api/features/:feature", getFeatures);
    app.get("/api/featureNames", getFeatureNames);
    app.get("/api/databaseNames", getDatabaseNames);
    app.get("/api/featureoptions/:featureName", getFeatureOptions);
    app.post("/api/featureupdate", updateFeature);
    app.post("/api/createfeature", createFeature);
    app.delete("/api/deletefeature/:fid", deleteFeature);
    app.post("/api/createfeatureoption", createFeatureOption);
    app.post("/api/updatefeatureoption", updateFeatureOption);
    app.delete("/api/deletefeatureoption/:foid", deleteFeatureOption);
    app.post("/api/getfeaturerankings", getFeatureRankings);
    
    function getFeatureRankings(req, res){
        payload = req.body;

        var backEndMappings = [];
        var i=0;

        while(i<payload.featureOptions){
            model.featureNameModel
                .getBackEndMapping(payload.featureOptions[i])
                .success(function(mapping){
                    backEndMappings.push(mapping)
                });
        }
        
        return model.featureRanksModel
            .getFeatureRanks(payload, backEndMappings)
            .then(function(ranks){
                res.send(ranks)
            });
    }

    function createFeatureOption(req, res){
        var payload = req.body;

        return model.featureModel
            .createFeatureOption(payload)
            .then(function(){
                res.send(200);
            });
    }

    function deleteFeatureOption(req, res){
        var featureOptionId = req.params.foid;

        return model.featureModel
            .deleteFeatureOption(featureOptionId)
            .then(function(){
                res.send(200);
            });
    }
    
    function updateFeatureOption(req, res){
        var payload = req.body;
        
        return model.featureModel
            .updateFeatureOption(payload)
            .then(function(){
                res.send(200);
            })
    }

    function createFeature(req, res){
        var payload = req.body;

        return model.featureNameModel
            .createFeatureName(payload)
            .then(function(){
                res.send(200);
            });
    }

    function deleteFeature(req, res){
        var featureId = req.params.fid;

        return model.featureNameModel
            .deleteFeatureName(featureId)
            .then(function(){
                res.send(200);
            });
    }
    
    function updateFeature(req, res){
        var feature = req.body;
        
        console.log(feature);

        var oldFeatureName = model.featureNameModel
            .getLowercaseName(feature);

        return model.featureNameModel
                    .updateFeatureNames(feature)
                    .then(function(){
                        model.featureModel
                            .updateFeatureCategory(feature, oldFeatureName)
                            .then(function(){
                        res.send(200);
                    });
            });
    }

    function getFeatureOptions(req, res){
        var feature = req.params.featureName;

        return model.featureModel
            .getFeatures(feature)
            .then(function(options){
                res.send(options);
            })
            
    }


    function getDatabaseNames(req, res){
        console.log("in databaseNames");
        return model.databaseNamesModel
            .getDatabases()
            .then(function(names){
                res.send(names);
            })
    }

    function getFeatureNames(req, res){
        console.log("in getFeatureNames");
        return model.featureNameModel
            .getFeatureNames()
            .then(function(features){
                console.log(features);
                res.send(features);
            })
    }

    function getFeatures(req, res) {
        console.log("in get admin features server");

        var feature = req.params.feature;

        return model.featureModel
            .getFeatures(feature)
            .then(function (values) {
                console.log("values are " + values);
                res.send(values);
            });
    }
};
