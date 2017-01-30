/**
 * Created by andrewdickens on 10/17/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("PagesListController", PagesListController);

    function PagesListController(PageService, $routeParams) {
        console.log("in page list controller");
        var vm = this;
        // var currentPageName = "";
        //
        // vm.updatePage = UpdatePage;
        // vm.updateFields = UpdateFields;
        // vm.prependPage = PrependPage;
        // vm.deletePage = DeletePage;
        
        var uid = $routeParams.uid;
        var wid = $routeParams.wid;
        //
        // vm.name = "";
        // vm.title = "";
        //
        // console.log(uid);
        // console.log(wid);
        //
        vm.wid = $routeParams.wid;
        vm.uid = $routeParams.uid;
        vm.pid = $routeParams.pid;

        function init() {
            getPages(wid);

            function getPages(wid) {
                PageService
                    .findAllPagesForWebsite(wid)
                    .success(function (pages) {
                        console.log("inside success callback");
                        console.log(pages);
                        vm.pages = pages;
                    })
                    .error(function (error) {

                    });
            }
        }init();

    //
    //     function UpdateFields(name) {
    //         console.log(name);
    //
    //         var thisTitle = PageService
    //             .getTitleByName(name)
    //             .success(function (title) {
    //                 var thisTitle = title;
    //                 if (thisTitle == null) {
    //                     window.alert("Please enter a valid website name")
    //                 } else {
    //                     vm.name = name;
    //                     vm.title = thisTitle;
    //                 }
    //             })
    //             .error(function (error) {
    //
    //             });
    //     }
    //
    //     function DeletePage(name) {
    //         PageService
    //             .deletePage(name)
    //             .success(function (name) {
    //
    //             })
    //             .error(function (error) {
    //
    //             });
    //
    //         vm.pages = PageService
    //             .findPagesForUser(uid)
    //             .success(function (pages) {
    //                 vm.pages = pages;
    //             })
    //             .error(function (error) {
    //
    //             });
    //     }
    //
    //     function UpdatePage(name, title) {
    //         PageService
    //             .updatePageByName(currentPageName, name, title)
    //             .success(function (name) {
    //
    //             })
    //             .error(function (error) {
    //
    //             });
    //     }
    //
    //     function PrependPage(name) {
    //         currentPageName = name;
    //         UpdateFields(name);
        }
    // }


})();
