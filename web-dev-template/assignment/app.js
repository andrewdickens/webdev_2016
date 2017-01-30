/**
 * Created by andrewdickens on 11/5/16.
 */

module.exports = function(app){
    var model = require("./models/model.server")();

    require("./services/user.service.server.js")(app, model);
    require("./services/website.service.server.js")(app, model);
    require("./services/page.service.server.js")(app, model);
    require("./services/widget.service.server.js")(app, model);

    // var modelProject = require("../project/models/model.server")();
    //
    // // require("../../projec/services/feature.service.server.js")(app, modelProject);
    // // require("../../project/services/user.service.server.js")(app);
};
