/**
 * Created by andrewdickens on 11/23/16.
 */

module.exports = function () {
    var model = {};

    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server")();
    var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);

    var api = {
        createWidget: createWidget,
        findWidgetsForPage: findWidgetsForPage,
        setModel: setModel,
        getWidgetById: getWidgetById,
        deleteWidget: deleteWidget,
        updateWidget: updateWidget
        // reorderWidget: reorderWidget //todo
    };
    return api;

    function setModel(_model) {
        model = _model;
    }
    
    function updateWidget(wgid, widget){
        return WidgetModel
            .remove({_id : wgid})
            .create(widget);
    }

    function deleteWidget(wgid){
        return WidgetModel
            .remove({_id : wgid});
    }
    
    function getWidgetById(wgid){
        return WidgetModel
            .findById(wgid);
    }

    function findWidgetsForPage(payload){
        console.log("in findWidgetsForPage [widget.model.server]");
        console.log(payload.pageId);
        return model.pageModel
            .findPageById(payload.pageId)
            .then(function(page){
                console.log("page.widgets is "+page.widgets);
                return page.widgets;
            })
        
    }
    
    function createWidget(uid, wid, pid, widget) {
        console.log("widget is " + widget);

        console.log("in createWidget [widget.model.server]");

        return WidgetModel
            .create(widget)
            .then (function (widget) {
            return model.websiteModel
                        .findWebsiteById(wid)
                        .then(function (website) {
                            for (var i in website.pages) {
                                console.log("variable i is "+i);
                                if (website.pages[i]._id == pid) {
                                    console.log("in if");
                                    console.log(widget);
                                    website.pages[i].widgets.push(widget);
                                    console.log(website.pages[i].widgets);

                                    website.pages[i].save();
                                    console.log("newPage is " + website.pages[i]);
                                    console.log(website.pages[i]);
                                    return website.pages[i];

                                }
                            }
                            // return widget;
                        });
                    // .then(function (newPage) {
                    //     newPage.widgets.push(widget);
                    //     console.log(newPage);
                    //
                    //     newPage.save();
                    //     return newPage;
                    // })
                });
    }
};