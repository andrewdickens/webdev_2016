(function(){
    angular
        .module("webDevProject")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        // function login(){
        //     $location.url("/intro");
        // }

        function login() {

            var user = {
                username: vm.username,
                password: vm.password
            };
            
            console.log(user);
            
            UserService.login(user)
                .success(function(feature){
                    console.log(feature);
                    if(feature === '0') {
                        vm.error = "No such user";
                    } else {
                        $location.url("/intro");
                    }
                })
                .error(function(bbbb){
                    console.log(bbbb);
                });
        }
    }
})();