(function(){
    angular
        .module("webDevProject")
        .controller("UserPageController", UserPageController);

    function UserPageController(UserService) {
        var vm = this;
        vm.deleteUser = deleteUser;
        vm.updateUser = updateUser;

        function init(){

            UserService.getCurrentUser()
                .success(function(user){
                    console.log(user);
                    vm.user = user
                });

        }init();

        function deleteUser(user){

            UserService.deleteUser(user)
                .success(function(){
                    init();
                })
        }

        function updateUser(user){

            var payload = {
                user: user
            };

            console.log(user);

            UserService.updateUsername(payload)
                .success(function(){
                    UserService.getAllUsers()
                        .success(function(users){
                            console.log(users);
                            vm.users = users
                        });
                });

        }
    }
})();