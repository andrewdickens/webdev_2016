/**
 * Created by andrewdickens on 10/17/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetsListController", WidgetsListController);

    function WidgetsListController($routeParams, WidgetService, $sce) {
        console.log("in page controller");
        var vm = this;

        var uid = $routeParams.uid;
        var wid = $routeParams.wid;

        console.log(uid);
        console.log(wid);

        vm.wid = $routeParams.wid;
        vm.uid = $routeParams.uid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;

        vm.checkSafeHtml = checkSafeHtml;
        vm.checkSafeYouTubeUrl = checkSafeYouTubeUrl;

        function init() {
            var widgets = $(".wam-widgets").sortable;


            WidgetService
                .findWidgetsByPageId(vm.pid, uid, wid)
                .success(function (widgets) {
                    console.log("in success callback widgetService");
                    console.log(widgets[0]);
                    vm.widgets = widgets;
                })
                .error(function (error) {
                });
            
        }init();

        // PageService
        //     .findAllPagesForWebsite(wid)
        //     .success(function(pages){
        //         console.log("in success callback pageService");
        //         vm.pages = pages;
        //     })
        //     .error(function(error){});
        //
        // // console.log(vm.pages[0]);
        // WebsiteServices
        //     .findWebsitesForUser(uid)
        //     .success(function(website){
        //         console.log("in success callback websiteService");
        //         vm.website = website;
        //     })
        //     .error(function(error){});
        //
        // // console.log(vm.website);
        // UserService
        //     .findUserById(uid)
        //     .success(function(feature){
        //         console.log("in success callback userService");
        //         vm.feature = feature;
        //     })
        //     .error(function(error){});
        //
        // // console.log(vm.feature);
        //


        function checkSafeHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function checkSafeYouTubeUrl(url) {
            var parts = url.split('/');
            var id = parts[parts.length - 1];
            url = "https://www.youtube.com/embed/" + id;
            console.log(url);
            return $sce.trustAsResourceUrl(url);
        }

    }
})();
