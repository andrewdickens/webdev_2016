(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsitesNewController", WebsitesNewController);

    function WebsitesNewController($routeParams, WebsiteService, $location) {
        var vm = this;
        var userId = $routeParams.uid;
        vm.userId = userId;
        vm.createWebsite = createWebsite;

        function init() {
            console.log("in init()");
            console.log(userId);
            WebsiteService
                .findWebsitesForUser(userId)
                .success(function (websites) {
                    console.log("websites are " + websites[0]._id);
                    vm.website = websites;
                });
        }
        init();

        function createWebsite(website) {
            console.log("website name is "+vm.name);
            console.log("website description is "+vm.description);

            website.uid = userId;
            website.name = vm.name;
            website.description = vm.description;

            var websites = {
                name: vm.name,
                description: vm.description,
                uid: userId
            };

            WebsiteService
                .createWebsite(userId, websites)
                .success(function () {
                    $location.url("/user/"+userId+"/website");
                });
        }
    }
})();
