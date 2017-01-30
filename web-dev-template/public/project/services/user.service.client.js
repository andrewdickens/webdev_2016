/**
 * Created by andrewdickens on 12/4/16.
 */
(function () {
    angular
        .module("webDevProject")
        .factory("UserService", UserService);

    function UserService($http) {

        var api = {
            login: login,
            register: register,
            getAllUsers: getAllUsers,
            promoteAdmin: promoteAdmin,
            demoteAdmin: demoteAdmin,
            updateUsername: updateUsername,
            isAdmin: isAdmin,
            deleteUser: deleteUser,
            getCurrentUser: getCurrentUser
        };
        return api;

        function getCurrentUser() {
            return $http.get("/api/getCurrentUser");
        }

        function deleteUser(user) {
            return $http.delete("/api/deleteUser/" + user._id);
        }
        
        function isAdmin() {
            return $http.get("/api/isAdmin");
        }

        function updateUsername(payload) {
            return $http.post("/api/updateUsername", payload);
        }

        function demoteAdmin(user) {
            console.log("in demoteAdmin client");

            console.log(user);

            return $http.post("/api/demoteAdmin", user);
        }

        function promoteAdmin(user) {
            console.log("in promoteAdmin client");

            console.log(user);

            return $http.post("/api/promoteAdmin", user);
        }

        function getAllUsers() {
            return $http.get("/api/getAllUsers");
        }

        function register(user) {
            return $http.post("/api/register", user);
        }

        function login(user) {

            console.log(user);
            return $http.post("/api/login", user);
        }
    }
})();