(function () {
    angular
        .module("webDevProject")
        .controller("IntroController", IntroController);

    function IntroController(FeatureService, $location, ContentService, UserService) {
        var vm = this;
        vm.chart = chart;
        vm.heat = heat;
        vm.log = log;
        vm.update = update;
        vm.logout = logout;
        vm.adminConsole = adminConsole;

        function adminConsole(){
            $location.url("/admin");
        }
        function init(){
            ContentService.getContent("intro")
                .success(function(text){
                    console.log(text);
                    vm.intro = text.content;
                });
            ContentService.getContent("body")
                .success(function(text){
                    vm.body = text.content;
                });
            ContentService.getContent("conclusion")
                .success(function(text){
                    vm.conclusion = text.content;
                });
            UserService.isAdmin()
                .success(function(bool){
                    if(bool == true){
                        vm.adminShow = true;
                    }else vm.adminShow = false;
                });
        }init();

        function logout() {
            $location.url("/login");
        }

        function update() {
            console.log(vm.feature);

            FeatureService.getAdminFeatureValues(vm.feature)
                .success(function (features) {
                    console.log("in success callback intro");
                    console.log(features);
                    vm.values = features;
                });
        }

        function log() {
            console.log(vm.databaseCompare)
        }

        function chart() {
            $location.url("/chart");
        }

        function heat() {
            $location.url("/heat");
        }
        
    }
})();