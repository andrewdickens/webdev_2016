(function(){
    angular
        .module("webDevProject")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register() {

            var user = {
                username: vm.username,
                password: vm.password,
                admin: false
            };

            UserService.register(user)
                .success(function(){
                     $location.url("/intro");
                })
                .error(function(bbbb){
                    console.log(bbbb);
                });
        }
    }
})();