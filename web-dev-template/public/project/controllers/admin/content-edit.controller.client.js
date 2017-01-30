(function(){
    angular
        .module("webDevProject")
        .controller("ContentEditController", ContentEditController);

    function ContentEditController(ContentService) {
        var vm = this;
        vm.updateContent = updateContent;

        vm.overview = "Use this page to edit the content.";

        function init(){
            ContentService.getContent("intro")
                .success(function(text){
                    vm.intro = text.content;
                });
            ContentService.getContent("body")
                .success(function(text){
                    vm.body = text.content;
                });
            ContentService.getContent("conclusion")
                .success(function(text){
                    vm.conclusion = text.content;
                });

            vm.adminShow = true;
        }init();

        function updateContent(placement){
            
            if(placement == 'intro') {
                var payload = {
                    placement: placement,
                    content: vm.intro
                };
            } else if(placement == 'body') {
                var payload = {
                    placement: placement,
                    content: vm.body
                };
            } else if(placement == 'conclusion') {
                var payload = {
                    placement: placement,
                    content: vm.conclusion
                };
            }

            console.log(placement);
            
            ContentService.updateContent(payload)
                .success(function(text){
                    ContentService.getContent("intro")
                        .success(function(text){
                            vm.intro = text.content;
                        });
                    ContentService.getContent("body")
                        .success(function(text){
                            vm.body = text.content;
                        });
                    ContentService.getContent("conclusion")
                        .success(function(text){
                            vm.conclusion = text.content;
                        });
                });

            // init();
        }
    }
})();