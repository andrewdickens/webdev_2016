(function() {
    angular
        .module("webDevProject")
        .controller("UserEditController", UserEditController);

    function UserEditController(UserService) {
        var vm = this;
        vm.promoteAdmin = promoteAdmin;
        vm.demoteAdmin = demoteAdmin;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        
        function init(){
            
            UserService.getAllUsers()
                .success(function(users){
                    console.log(users);
                    vm.users = users
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

        function demoteAdmin(user){
            console.log(user);

            UserService.demoteAdmin(user)
                .success(function(){
                    UserService.getAllUsers()
                        .success(function(users){
                            console.log(users);
                            vm.users = users
                        });
                });

        }
        
        function promoteAdmin(user){
            console.log(user);

            UserService.promoteAdmin(user)
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