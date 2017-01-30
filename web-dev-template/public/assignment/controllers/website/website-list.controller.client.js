// (function () {
//     angular
//         .module("WebAppMaker")
//         .controller("WebsiteListController", WebsiteListController);
//
//     function WebsiteListController($routeParams, WebsiteServices, UserService) {
//         console.log("inside WebsiteListController");
//         var vm = this;
//         var currentWebsiteName = "";
//
//         vm.updateFields = UpdateFields;
//         vm.deleteWebsite = DeleteWebsite;
//         vm.updateWebsite = UpdateWebsite;
//         vm.prependWebsite = PrependWebsite;
//
//
//         vm.name = "";
//         vm.description = "";
//         var uid = $routeParams.uid;
//
//         function init() {
//             console.log("inside init()");
//
//             // getWebsite();
//             getUser();
//
//             // function getWebsite() {
//             //     console.log("in vm.website function");
//             //     WebsiteServices
//             //         .findWebsitesForUser(uid)
//             //         .success(function (websites) {
//             //             console.log("in success callback");
//             //             console.log(websites);
//             //             vm.website = websites;
//             //         })
//             //         .error(function () {
//             //
//             //         });
//             // }
//
//             function getUser() {
//                 UserService
//                     .findUserById(uid)
//                     .success(function (feature) {
//                         console.log(feature);
//                         vm.feature = feature;
//                     })
//                     .error(function () {
//
//                     });
//             }
//         }
//
//         init();
//         //
//         //     function UpdateFields(name) {
//         //         console.log("in update Fields");
//         //         console.log(name);
//         //
//         //         var thisDescription = WebsiteServices.getWebsiteDescriptionByName(name);
//         //
//         //         if (thisDescription == null) {
//         //             window.alert("Please enter a valid website name")
//         //         } else {
//         //             vm.name = name;
//         //             vm.description = thisDescription;
//         //         }
//         //     }
//         //
//         //     function DeleteWebsite(name) {
//         //         console.log("in deleteWebsite from controller list");
//         //
//         //         deleteWebsite(name);
//         //         // getWebsite();
//         //
//         //         function deleteWebsite(name){
//         //             console.log("in deleteWebsite");
//         //             WebsiteServices
//         //                 .deleteWebsite(name)
//         //                 .success(function (websites){
//         //                     console.log("in success callback");
//         //                     vm.website = websites;
//         //                     $location.url("www.google.com");
//         //                 })
//         //                 .error(function (error){
//         //
//         //                 });
//         //         }
//         //
//         //         // WebsiteServices.deleteWebsite(name);
//         //
//         //         // function getWebsite() {
//         //         //     console.log("in vm.website function");
//         //         //     WebsiteServices
//         //         //         .findWebsitesForUser(uid)
//         //         //         .success(function (websites) {
//         //         //             console.log("in success callback");
//         //         //             console.log(websites);
//         //         //             vm.website = websites;
//         //         //         })
//         //         //         .error(function () {
//         //         //
//         //         //         });
//         //         // }
//         //         // vm.website = WebsiteServices.findWebsitesForUser(uid);
//         //     }
//         //
//         //     function UpdateWebsite(name, description) {
//         //         WebsiteServices.updateWebsiteByName(currentWebsiteName, name, description);
//         //     }
//         //
//         //     function PrependWebsite(name) {
//         //         currentWebsiteName = name;
//         //         UpdateFields(name);
//         //     }
//     }
// })();

(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;

        vm.userId = $routeParams['uid'];

        function init() {
            console.log("in init()");
            WebsiteService
                .findWebsitesForUser(vm.userId)
                .success(function (websites) {
                    console.log("websites are " + websites[0]._id);
                    vm.website = websites;
                });
        }
        init();

    }
})();