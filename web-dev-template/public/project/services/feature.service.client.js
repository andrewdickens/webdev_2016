/**
 * Created by andrewdickens on 12/4/16.
 */
(function () {
    angular
        .module("webDevProject")
        .factory("FeatureService", FeatureService);

    function FeatureService($http) {

        var api = {
            getAdminFeatureValues: getAdminFeatureValues,
            getFeatureNames: getFeatureNames,
            getDatabaseNames:getDatabaseNames,
            getFeatureOptions:getFeatureOptions,
            updateFeature:updateFeature,
            createFeature: createFeature,
            deleteFeature: deleteFeature,
            createFeatureOption:createFeatureOption,
            updateFeatureOption:updateFeatureOption,
            deleteFeatureOption:deleteFeatureOption,
            getFeatureRanks:getFeatureRanks
        };
        return api;
        
        function getFeatureRanks(database, featureOptions, featureCategory){
            var payload = {
                database: database,
                featureOptions: featureOptions,
                featureCategory: featureCategory
            };
            
            return $http.post("/api/getfeaturerankings", payload);
        }
        
        function createFeatureOption(payload){
            return $http.post("/api/createfeatureoption", payload);
        }
        
        function updateFeatureOption(option){
            return $http.post("/api/updatefeatureoption", option);
        }
        
        function deleteFeatureOption(option){
            return $http.delete("/api/deletefeatureoption/" + option._id);
        }
        
        function createFeature(payload){
            return $http.post("/api/createfeature", payload);
        }
        
        function deleteFeature(feature){
            return $http.delete("/api/deletefeature/" + feature._id);
        }
        
        function updateFeature(feature){
            return $http.post("/api/featureupdate", feature);
        }
        
        function getFeatureOptions(feature){
            return $http.get("/api/featureoptions/"+feature.lowercaseName);
        }
        
        function getDatabaseNames(){
            return $http.get("/api/databaseNames");
        }

        function getFeatureNames(){
            return $http.get("/api/featureNames");
        }
        
        function getAdminFeatureValues(feature) {
            return $http.get("/api/features/"+feature);
        }
    }
})();