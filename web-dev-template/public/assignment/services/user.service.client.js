(function(){
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {

        var api = {
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            createUser: createUser,
            updateUser: updateUser,
            unregisterUser: unregisterUser,
            login: login,
            checkLogin: checkLogin,
            logout: logout,
            findCurrentUser:findCurrentUser
        };
        return api;

        function logout(){
            return $http.post("/api/logout");
        }
        function checkLogin(){
            console.log("in checkLogin [client]");
            
            return $http.post("/api/checkLogin");
            
        }
        
        function login(username, password){
            var user = {
                username: username,
                password: password
            };
            return $http.post("/api/login", user);
        } 
        
        function unregisterUser(uid) {
            var url = "/api/user/" + uid;
            return $http.delete(url);
        }

        function updateUser(user) {
            var url = "/api/user/" + user._id;
            console.log(user);
            $http.put(url, user);
        }

        function createUser(username, password) {
            var user = {
                username: username,
                password: password
            };

            console.log("example of user is "+user);
            return $http.post("/api/user", user);
        }

        function findCurrentUser(){
            var url = "/api/user";
            return $http.get(url);
        }
        function findUserById(userId) {
            console.log("in findUserById [feature.service.client.js]");
            console.log(userId);
            var url = "/api/user/"+userId;
            return $http.get(url);
        }

        function findUserByCredentials(username, password) {
            var url = '/api/user?username='+username+'&password='+password;
            return $http.get(url);

        }
    }
})();
