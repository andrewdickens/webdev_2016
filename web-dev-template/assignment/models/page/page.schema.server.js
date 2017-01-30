/**
 * Created by andrewdickens on 11/22/16.
 */

module.exports = function () {
    console.log("in page.schema.server");

    var mongoose = require("mongoose");
    var WebsiteSchema = require("../website/website.schema.server")();

    var PageSchema = mongoose.Schema(
        {
            _website: [{type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteModel'}],
            name: String,
            title: String,
            description: String,
            widgets: [{type: mongoose.Schema.Types.ObjectId, ref: 'WidgetModel'}],
            dateCreated: Date
        },
        {collection: "page"});
    return PageSchema;
};