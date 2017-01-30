var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({contentType: 'website/json'}));
// app.use(bodyParser.json({type: 'website/json'}));


// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

// require("./assignment/app.js")(app);
require("./project/app.js")(app);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ipaddress);
