(function () {
    angular
        .module("webDevProject")
        .controller("FeatureCategoryEditController", FeatureCategoryEditController);

    function FeatureCategoryEditController(FeatureService) {
        var vm = this;
        vm.createFeature = createFeature;
        vm.deleteFeature = deleteFeature;
        vm.editFeature = editFeature;

        function init() {
            getFeatureNames();
        }

        init();

        function getFeatureNames() {
            FeatureService
                .getFeatureNames()
                .success(function (names) {
                    vm.features = names;
                })
        }

        function createFeature() {
            var payload = {
                uppercaseName: vm.frontEndNew,
                lowercaseName: vm.backEndNew
            };

            console.log(payload);

            FeatureService
                .createFeature(payload)
                .success(function () {
                    getFeatureNames();
                })
        }

        function deleteFeature(feature) {

            console.log(feature);
            FeatureService
                .deleteFeature(feature)
                .success(function () {
                    getFeatureNames()
                });
        }

        function editFeature(feature){
            console.log(feature);
            
            FeatureService
                .updateFeature(feature)
                .success(function(){
                    getFeatureNames()
                });
        }
    }
})();