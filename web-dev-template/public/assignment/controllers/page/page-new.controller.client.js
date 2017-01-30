/**
 * Created by andrewdickens on 10/17/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("PagesNewController", PagesNewController);

    function PagesNewController(PageService, $routeParams, $location) {
        var vm = this;
        var uid = $routeParams.uid;
        var wid = $routeParams.wid;

        vm.createPage = CreatePage;

        vm.wid = $routeParams.wid;
        vm.uid = $routeParams.uid;
        vm.pid = $routeParams.pid;

        // PageService
        //     .findAllPagesForWebsite(wid)
        //     .success(function(pages){
        //         vm.pages = pages
        //     })
        //     .error(function(error){});
        //
        // WebsiteServices
        //     .findWebsitesForUser(uid)
        //     .success(function(website){
        //         vm.website = website
        //     })
        //     .error(function(error){});
        //
        // UserService
        //     .findUserById(uid)
        //     .success(function(feature){
        //         vm.feature = feature
        //     })
        //     .error(function(error){});

        function CreatePage(name, title) {

            var page = {
                name: name,
                title: title,
                userId: uid,
                websiteId: wid
            };

            PageService
                .createPage(page)
                .success(function () {
                    console.log("in callback from controller");
                    $location.url("/user/" + uid + "/website/" + wid + "/page");
                });
        }
    }
})();
