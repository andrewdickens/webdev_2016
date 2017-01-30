/**
 * Created by andrewdickens on 11/6/16.
 */
module.exports = function (app, model) {
    console.log("In page.service.server");

    var pages = [
        {_id: 321, name: "Post 1", websiteId: 123, title: "Moby Dick"},
        {_id: 456, name: "Post 2", websiteId: 123, title: "Superman"},
        {_id: 543, name: "Post 3", websiteId: 678, title: "Wonder Woman"}
    ];

    app.post('/api/website/:websiteId/page', createPage);
    app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
    app.get('/api/page/:pageId', findPageByID);
    app.put('/api/page/:pageId', updatePage);
    app.delete('/api/page/:pageId', deletePage);

    function createPage(req, res) {

        var page = req.body;
        page._website = req.params.websiteId;
        
        model.pageModel
            .createPage(page)
            .then(function(page){
                console.log("page name in callback is "+page.name);
                res.json(page);
            });

    }

    function findAllPagesForWebsite(req, res) {
        console.log("inside findAllPagesForWebsite [page.service.server]");
        
        var wid = req.params.websiteId;

        model.pageModel
            .findAllPagesForWebsite(wid)
            .then(function(pages){
                res.json(pages);
            })
    }

    function findPageByID(req, res) {
        console.log("in find page by id");

        var pid = req.params.pageId;
        
        return model.pageModel
            .getPageById(pid)
            .then(function(page){
                console.log(page);
                res.json(page);
            })
    }

    function updatePage(req, res) {
        
    }

    function deletePage(req, res) {

        var pid = req.params.pageId;

        return model.pageModel
            .deletePage(pid)
            .then(function(status){
                res.send(200);
            });
    }
};