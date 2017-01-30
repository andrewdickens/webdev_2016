(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $routeParams, UserService) {
        var vm = this;

        var userId = $routeParams.uid;

        vm.updateUser = updateUser;
        vm.unregisterUser = unregisterUser;
        vm.logout = logout;

        function logout(){
            UserService.logout()
                .success(function(){
                    $location.url("/login");
                });
        }

        function init() {
            UserService
                // .findUserById(userId)
                .findCurrentUser()
                .success(function(user){
                    if(user != '0') {
                        vm.user = user;
                    }
                })
                .error(function(){

                });
        }
        init();

        function updateUser() {
            console.log(vm.user);
            UserService.updateUser(vm.user);
        }

        function unregisterUser() {
            UserService
                .unregisterUser(vm.user._id)
                .success(function(){
                    $location.url("/login");
                })
                .error(function(){

                });
        }
    }
})();

