(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {

        var api = {
            findWebsitesForUser: findWebsitesForUser,
            getWebsiteById: getWebsiteById,
            createWebsite: createWebsite,
            updateWebsite: updateWebsite,
            removeWebsite: removeWebsite
        };
        return api;

        function removeWebsite(wid) {
            return $http.delete('/api/website/'+wid);
        }

        function updateWebsite(website) {
            for (var w in websites) {
                if (websites[w]._id === website._id) {
                    websites[w] = website;
                }
            }
        }

        function createWebsite(uid, website) {
            console.log("in createWebsite [website.service.client]");
            // websites.push(website);
            var url = "/api/user/"+uid+"/website";
            
            return $http.post(url, website);
        }

        function getWebsiteById(wid) {
            return $http.get('/api/website/'+wid);
        }

        function findWebsitesForUser(uid) {
            console.log("in find websites for feature [client]");
            var url = "/api/user/"+uid+"/website";
            console.log("value is "+$http.get(url));
            return $http.get(url);
        }
    }
})();