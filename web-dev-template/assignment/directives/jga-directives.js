/**
 * Created by andrewdickens on 11/8/16.
 */

(function(){
    angular
        .module("utility", [])
        .directive("sortable", sortable);
    
    return {
        restrict: "C",
        link: function(scope, element, attrs) {
            element.sortable();
        }
    }
});