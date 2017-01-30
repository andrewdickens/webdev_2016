/**
 * Created by andrewdickens on 10/17/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("PagesEditController", PagesEditController);

    function PagesEditController($routeParams, PageService, $location) {
        var vm = this;
        vm.deletePage = DeletePage;
        // vm.updateFields = UpdateFields;

        var uid = $routeParams.uid;
        var wid = $routeParams.wid;
        var pid = $routeParams.pid;

        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;


        function init(){
            console.log("in init()");
            PageService
                .getPageById(pid)
                .success(function(page){
                    console.log(page);
                    vm.pageName = page.name;
                    vm.pageTitle = page.title;
                })

        }init();

        function DeletePage(){
            PageService
                .deletePage(pid);
            $location.url("/user/"+uid+"/website/"+wid+"/page");

        }

    }
})();
