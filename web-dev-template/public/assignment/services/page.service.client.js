(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http) {
        var pages = [
            {_id: 321, name: "Post 1", websiteId: 123, title: "Moby Dick"},
            {_id: 456, name: "Post 2", websiteId: 123, title: "Superman"},
            {_id: 543, name: "Post 3", websiteId: 456, title: "Wonder Woman"}
        ];

        var api = {
            "createPage": createPage,
            "findPagesByWebsiteIDAndUserID": findPagesByWebsiteIDAndUserID,
            "getPageById": getPageById,
            "updatePage": updatePage,
            "deletePage": deletePage,
            "getTitleByName": getTitleByName,
            "findPagesForUser": findPagesForUser,
            "updatePageByName": UpdatePageByName,
            "getPageNameByWebsiteIDPageID": getPageNameByWebsiteIDPageID,
            "getPageTitleByName": getPageTitleByName,
            "findAllPagesForWebsite": findAllPagesForWebsite
        };
        return api;

        function findAllPagesForWebsite(wid) {
            console.log("inside page client");
            console.log(wid);
            return $http.get('/api/website/' + wid + '/page');
        }

        function getPageNameByWebsiteIDPageID(wid, pid) {
            for (var p in pages) {
                if (pages[p].websiteId === wid && pages[p]._id == pid) {
                    return pages[p].name;
                }
            }
            return null;
        }

        function getPageTitleByName(name) {
            for (var p in pages) {
                if (pages[p].name == name) {
                    return pages[p].title;
                }
            }
            return null;
        }

        function UpdatePageByName(currentName, name, title) {
            for (var p in pages) {
                if (pages[p].name == currentName) {
                    pages[p].name = name;
                    pages[p].title = title;
                }
            }
            return null;
        }

        function findPagesForUser(uid) {
            var result = [];
            for (var p in pages) {
                // console.log("uid is " + uid + " and devID is " + websites[w].developerId);
                if (pages[p]._id === uid) {
                    console.log("true");
                    result.push(pages[p]);
                }
            }
            return result;
        }

        function getTitleByName(name) {
            console.log(name);
            for (var p in pages) {
                if (pages[p].name == name) {
                    return pages[p].title;
                }
            }
            return null;
        }


        function createPage(page) {
            console.log("page is " + page + " in [page.service.client]");

            return $http.post('/api/website/' + page.websiteId + '/page', page);
        }

        function findPagesByWebsiteIDAndUserID(wid, uid) {
            console.log("in page service");
            var result = [];
            for (var p in pages) {
                // console.log("id is " + );
                console.log(pages[p].websiteId);
                if (pages[p].websiteId == wid) {
                    result.push(pages[p]);
                }
            }
            console.log("result is " + result[0]);
            return result;

        }

        function getPageById(pid) {
            console.log("in service client");
            return $http.get('/api/page/'+pid);
        }

        function updatePage() {

        }

        function deletePage(pid) {
            console.log("inside deletePage in service");
            return $http.delete('/api/page/' + pid);

        }
    }
})();