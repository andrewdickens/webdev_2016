/**
 * Created by andrewdickens on 11/19/16.
 */
module.exports = function(){
    var model = {};

    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server")();
    var WebsiteModel = mongoose.model("WebsiteModel", WebsiteSchema);

    var api = {
        createWebsite: createWebsite,
        findWebsitesForUser: findWebsitesForUser,
        setModel: setModel,
        deleteWebsite: deleteWebsite,
        findWebsiteByPageAndUserId: findWebsiteByPageAndUserId,
        findWebsiteById: findWebsiteById,
        findWebsiteFromWebsites: findWebsiteFromWebsites,
        findWebById: findWebById,
        updateWebsite: updateWebsite
    };
    return api;
    
    function updateWebsite(wid, website){
        return WebsiteModel
            .remove({_id : wid})
            .create(website);
    }

    function findWebsiteFromWebsites(user, wid){
        return function() {
            for (var i in user.websites) {
                if (user.websites[i]._id == wid) {
                    return user.websites[i];
                }
            }
        }
    }
    
    function findWebsiteById(wid){
        return WebsiteModel
            .findById(wid)
            .populate("pages")
            .exec();
    }
    
    function findWebById(wid){
        return WebsiteModel.findById(wid);
    }
    
    function deleteWebsite(wid){
        return WebsiteModel
            .remove({_id: wid});
    }

    function setModel(_model){
        model = _model;
    }

    function findWebsiteByPageAndUserId(page){
        console.log("in findWebsiteById [website.model.server]");
        console.log(page.id);
        console.log("websiteId is "+page.wid);

        return findWebsitesForUser(page.id)
            .then(function(user){
                console.log("websites are "+user.websites);
                for (var w in user.websites){
                    console.log(page.wid);
                    console.log(user.websites[w]._id);
                    if(user.websites[w]._id == page.wid){
                        return user.websites[w];
                    }
                }
            })
    }

    function findWebsitesForUser(userId){
        console.log("in findWebsitesForUser [model]");
        return model.userModel
            .findWebsitesForUser(userId)
            .then(function(websites){
                console.log("websites are "+websites);
                return websites;
            });
    }

    function createWebsite(userId, website) {
        console.log("in createWebsite [model]");
        console.log(website);
        return WebsiteModel
            .create(website)
            .then(function(website){
                console.log("after create, website is "+website);
                model.userModel
                    .findUserById(userId)
                    .then(function(user){
                        console.log(user);
                        console.log(website);
                        user.websites.push(website);
                        console.log("websites for user are "+user.websites);
                        console.log(user);
                        return user.save();
                    })
            })
    }
};