/**
 * Created by andrewdickens on 12/4/16.
 */
(function () {
    angular
        .module("webDevProject")
        .factory("ContentService", ContentService);

    function ContentService($http) {

        var api = {
            getContent: getContent,
            updateContent: updateContent
        };
        return api;

        function getContent(placement) {
            return $http.get("/api/content/"+placement);
        }

        function updateContent(payload) {
            console.log(payload);
            return $http.post("/api/content/update", payload);
        }
    }
})();