(function () {
    angular
        .module("webDevProject")
        .controller("FeatureEditController", FeatureEditController);

    function FeatureEditController(FeatureService) {
        var vm = this;
        vm.init = init;
        vm.getFeatureOptions = getFeatureOptions;
        vm.createFeatureOption = createFeatureOption;
        vm.updateFeatureOption = updateFeatureOption;
        vm.deleteFeatureOption = deleteFeatureOption;

        function init() {
            getFeatureNames();
            vm.show = false;
        }

        init();

        function createFeatureOption() {
            var payload = {
                category: vm.categoryValue,
                feature: vm.featureValue
            };

            console.log(payload);
            
            FeatureService
                .createFeatureOption(payload)
                .success(function(){
                    getFeatureOptions({lowercaseName:payload.category, uppercaseName:payload.category});
                });
        }

        function updateFeatureOption(option) {
            console.log(option);

            FeatureService
                .updateFeatureOption(option)
                .success(function(){
                    getFeatureOptions({lowercaseName:option.category, uppercaseName:option.category});
                });
        }

        function deleteFeatureOption(option) {
            console.log(option);

            FeatureService
                .deleteFeatureOption(option)
                .success(function(){
                    getFeatureOptions({lowercaseName:option.category, uppercaseName:option.category});
                });
        }

        function getFeatureNames() {
            FeatureService
                .getFeatureNames()
                .success(function (names) {
                    console.log(names);
                    vm.features = names;
                });
        }

        function getFeatureOptions(feature) {
            console.log("in getFeatureOptions");
            console.log(feature);
            vm.categoryValue = feature.lowercaseName;

            FeatureService
                .getFeatureOptions(feature)
                .success(function (options) {
                    console.log(options);
                    vm.featureOptions = options;
                    console.log(vm.featureOptions);
                    vm.show = true;
                });
        }
    }
})();