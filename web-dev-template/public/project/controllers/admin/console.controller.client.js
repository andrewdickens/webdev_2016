(function(){
    angular
        .module("webDevProject")
        .controller("ConsoleController", ConsoleController);

    function ConsoleController($location) {
        var vm = this;

        vm.content = content;
        vm.user = user;
        vm.chartData = chartData;
        vm.featureCategories = featureCategories;
        vm.editFeatures = editFeatures;

        function content(){
            console.log("in console");
            $location.url("/admin/content");
        }

        function user(){
            console.log("in console");
            $location.url("/admin/user");
        }
        
        function chartData(){
            $location.url("/admin/chartData");
        }
        
        function featureCategories(){
            $location.url("/admin/featureCategories");
        }
        
        function editFeatures(){
            $location.url("/admin/editFeatures");
        }

        vm.overview = "Use this console to edit the application."
    }
})();