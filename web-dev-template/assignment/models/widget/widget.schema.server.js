/**
 * Created by andrewdickens on 11/23/16.
 */
/**
 * Created by andrewdickens on 11/19/16.
 */

module.exports = function () {
    var mongoose = require("mongoose");
    var widgetSchema = mongoose.Schema({
            _page: [{type: mongoose.Schema.Types.ObjectId, ref: 'PageModel'}],
            widgetType: String,
            name: String,
            text: String,
            placeholder: String,
            description: String,
            url: String,
            width: String,
            height: String,
            rows: Number,
            size: Number,
            class: String,
            icon: String,
            deletable: Boolean,
            formatted: Boolean,
            dateCreated: Date
        },
        {collection: "widget"}
    );
    return widgetSchema;
};
