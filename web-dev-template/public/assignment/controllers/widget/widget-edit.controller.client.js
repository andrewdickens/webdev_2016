/**
 * Created by andrewdickens on 10/17/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($routeParams, WidgetService, $sce, $location) {
        console.log("in widget edit controller");
        var vm = this;

        var uid = $routeParams.uid;
        var wid = $routeParams.wid;
        var wgid = $routeParams.wgid;
        var pid = $routeParams.pid;

        var name = vm.name;
        var description = vm.description;
        var widgetType = $routeParams.type;

        console.log(uid);
        console.log(wid);
        console.log(wgid);
        console.log(name);
        // console.log(text);
        console.log(widgetType);

        vm.wid = $routeParams.wid;
        vm.uid = $routeParams.uid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;
        vm.widgetType = $routeParams.type;
        console.log("size is "+vm.size);

        vm.checkSafeHtml = checkSafeHtml;
        vm.checkSafeYouTubeUrl = checkSafeYouTubeUrl;

        vm.createWidget = createWidget;
        vm.deleteWidget = deleteWidget;

        function createWidget() {
            console.log(vm.name);
            console.log(vm.description);
            console.log(vm.widgetType);

            if (vm.widgetType == 'HEADER') {

                var widgetHeaderPayload = {
                    name: vm.name,
                    text: vm.description,
                    size: vm.size,
                    widgetType: vm.widgetType
                };

                var headerPayload = {
                    userId: vm.uid,
                    websiteId: vm.wid,
                    widget: widgetHeaderPayload,
                    pageId: vm.pid
                };

                WidgetService
                    .createWidget(headerPayload)
                    .then(function (widgets) {
                        console.log(widgets);
                        $location.url("/feature/" + uid + "/website/" + wid + "/page/" + vm.pid + "/widget");

                    });
            } else if (vm.widgetType == 'YOUTUBE') {
                var widgetPayload = {
                    name: vm.name,
                    text: vm.description,
                    widgetType: vm.widgetType,
                    url: vm.url
                };

                var payload = {
                    userId: vm.uid,
                    websiteId: vm.wid,
                    widget: widgetPayload,
                    pageId: vm.pid
                };

                WidgetService
                    .createWidget(payload)
                    .then(function (widgets) {
                        console.log(widgets);
                        $location.url("/feature/" + uid + "/website/" + wid + "/page/" + vm.pid + "/widget");

                    });
            } else if(vm.widgetType == 'IMAGE'){
                var widgetPayload = {
                    name: vm.name,
                    text: vm.description,
                    widgetType: vm.widgetType,
                    url: vm.url,
                    width: vm.width
                };

                var payload = {
                    userId: vm.uid,
                    websiteId: vm.wid,
                    widget: widgetPayload,
                    pageId: vm.pid
                };

                WidgetService
                    .createWidget(payload)
                    .then(function (widgets) {
                        console.log(widgets);
                        $location.url("/feature/" + uid + "/website/" + wid + "/page/" + vm.pid + "/widget");

                    });
            }

        }

        function init() {
            WidgetService
                .getWidgetById($routeParams.wgid)
                .success(function (widget) {
                    console.log(widget.name);

                    vm.widgetType = widget.widgetType;
                    vm.name = widget.name;
                    vm.description = widget.description;
                })
        }

        init();

        function deleteWidget(wgid) {
            WidgetService
                .deleteWidget($routeParams.wgid)
                .then(function () {
                    $location.url("/feature/" + uid + "/website/" + wid + "/page/" + pid + "/widget");
                });
        }

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
