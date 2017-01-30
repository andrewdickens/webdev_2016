/**
 * Created by andrewdickens on 10/17/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetNewController", WidgetNewController);
    
    function WidgetNewController($routeParams, WidgetService, $sce, $location) {
        var vm = this;
        console.log("in widgetnew controller");

        var uid = $routeParams.uid;
        var wid = $routeParams.wid;

        console.log(uid);
        console.log(wid);

        vm.wid = $routeParams.wid;
        vm.uid = $routeParams.uid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;

        function createWidget() {
            WidgetService
                .createWidget(uid, wid, vm.pid, vm.wgid)
                .then(function () {
                    $location.url("/user/" + userId + "/website/" + wid + "/page/" + pid + "widget");
                })
        }
    }
})();
