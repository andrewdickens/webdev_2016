(function () {
    angular
        .module("webDevProject")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                redirectTo: "/login"
            })
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/chart", {
                templateUrl: "views/user/chart.view.client.html",
                controller: "ChartController",
                controllerAs: "model"
            })
            .when("/intro", {
                templateUrl: "views/user/overview.view.client.html",
                controller: "IntroController",
                controllerAs: "model"
            })
            .when("/heat", {
                templateUrl: "views/user/heat.view.client.html",
                controller: "HeatController",
                controllerAs: "model"
            })
            .when("/admin", {
                templateUrl: "views/admin/console.view.client.html",
                controller: "ConsoleController",
                controllerAs: "model"
                // resolve: {
                //     checkLogin: checkLogin
                // }
            })
            .when("/admin/content", {
                templateUrl: "views/admin/content-edit.view.client.html",
                controller: "ContentEditController",
                controllerAs: "model"
            })
            .when("/admin/user", {
                templateUrl: "views/admin/user-edit.view.client.html",
                controller: "UserEditController",
                controllerAs: "model"
            })
            .when("/admin/chartData", {
                templateUrl: "views/admin/chart-edit.view.client.html",
                controller: "ChartEditController",
                controllerAs: "model"
            })
            .when("/admin/featureCategories", {
                templateUrl: "views/admin/featureCategory-edit.view.client.html",
                controller: "FeatureCategoryEditController",
                controllerAs: "model"
            })
            .when("/admin/editFeatures", {
                templateUrl: "views/admin/feature-edit.view.client.html",
                controller: "FeatureEditController",
                controllerAs: "model"
            })
            .when("/user/useredit", {
                templateUrl: "views/user/user-page.view.client.html",
                controller: "UserPageController",
                controllerAs: "model"
            });
       

    }
})();



