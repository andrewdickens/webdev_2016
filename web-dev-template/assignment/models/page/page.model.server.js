/**
 * Created by andrewdickens on 11/22/16.
 */
module.exports = function () {
    console.log("in page.model.server");
    var model = {};

    var mongoose = require("mongoose");
    var PageSchema = require("./page.schema.server")();
    var PageModel = mongoose.model("PageModel", PageSchema);
    // var WebsiteModel = require("./website/website.model.server.js")();

    var api = {
        setModel: setModel,
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageInPages: findPageInPages,
        findPageById: findPageById,
        deletePage: deletePage,
        getPageById: getPageById,
        updatePage: updatePage
    };
    return api;

    function setModel(_model) {
        model = _model;
    }
    
    function updatePage(pid, page){
        return PageModel
            .remove({_id : pid})
            .create(page);
    }
    
    function deletePage(pid){
        return PageModel
            .remove({_id: pid});
    }
    
    function findPageById(pid){
        
        return PageModel
            .findById(pid)
            .populate("widgets")
            .exec();
    }
    
    function getPageById(pid){
        return PageModel
            .findById(pid);
    }
    
    function findPageInPages(pages, pid){
        for(var i in pages){
            if(pages[i]._id == pid){
                return pages[i];
            }
        }
    }
    
    function findAllPagesForWebsite(wid){
        
        return model.websiteModel
            .findWebsiteById(wid)
            .then(function(website){
                return website.pages;
            });
    }

    function createPage(page) {
        console.log("in createPage [page.model.server]");
        console.log("userId is "+page.userId);
        return PageModel
            .create(page)
            .then(function (pages) {
                console.log("in success callback createPage [page.model.server]");
                console.log("After create, pages is "+pages);
                return model.websiteModel
                    .findWebsiteByPageAndUserId({id: page.userId, wid: page.websiteId})
                    .then(function (website) {
                        website.pages.push(pages);
                        console.log("website is " + website);
                        website.save();
                        return website;
                    })
            })
    }
};