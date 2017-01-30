module.exports = function(app){
    var model = require("./models/model.server")();

    require("./services/feature.service.server.js")(app, model);
    require("./services/user.service.server.js")(app, model);
    require("./services/content.service.server.js")(app, model);


};
