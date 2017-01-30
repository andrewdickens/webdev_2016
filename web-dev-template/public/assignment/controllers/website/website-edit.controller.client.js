(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsitesEditController", WebsitesEditController);

    function WebsitesEditController($routeParams, WebsiteService, $location) {
        var vm = this;
        var userId = $routeParams.uid;
        vm.userId = userId;
        var websiteId = $routeParams.wid;
        console.log("wid is "+$routeParams.wid);
        vm.updateWebsite = updateWebsite;
        vm.removeWebsite = removeWebsite;

        function init() {
            console.log("in init()");
            console.log(userId);
            WebsiteService
                .findWebsitesForUser(userId)
                .success(function (websites) {
                    console.log("websites are " + websites[0]._id);
                    vm.website = websites;
                });
            
            WebsiteService
                .getWebsiteById(websiteId)
                .success(function(website){
                    vm.name = website.name;
                    vm.description = website.description
                })
        }
        init();

        function updateWebsite() {
            WebsiteService
                .updateWebsite(website);
            $location.url("/user/"+userId+"/website");
        }

        function removeWebsite() {
           
            WebsiteService
                .removeWebsite(websiteId);
            $location.url("/user/"+userId+"/website");
        }
    }
})();
