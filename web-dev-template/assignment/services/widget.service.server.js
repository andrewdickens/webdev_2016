/**
 * Created by andrewdickens on 11/6/16.
 */

module.exports = function (app, model) {
    console.log("In widget.service.server");
    
        var widgets = [
            {_id: 123, widgetType: "HEADER", pageId: 543, size: 2, text: "GIZMODO"},
            {_id: 234, widgetType: "HEADER", pageId: 543, size: 4, text: "Lorem ipsum"},
            {
                _id: 345, widgetType: "IMAGE", pageId: 543, width: "100%",
                url: "http://lorempixel.com/400/200/"
            },
            {_id: 456, widgetType: "HTML", pageId: 543, text: "<p>Lorem ipsum</p>"},
            {_id: 567, widgetType: "HEADER", pageId: 543, size: 4, text: "Lorem ipsum"},
            {
                _id: 678, widgetType: "YOUTUBE", pageId: 543, width: "100%",
                url: "https://youtu.be/AM2Ivdi9c4E"
            },
            {_id: 789, widgetType: "HTML", pageId: 543, text: "<p>Lorem ipsum</p>"}
        ];

        app.post('/api/page/:pageId/widget', createWidget);
        app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
        app.get('/api/widget/:widgetId', findWidgetsByID);
        app.put('/api/widget/:widgetId', updateWidget);
        app.delete('/api/widget/:widgetId', deleteWidget);
       
        function createWidget(req, res){
           var payload = req.body;
            console.log(payload);
            payload.widget._pageId = payload.pageId;
            
            return model.widgetModel
                .createWidget(payload.userId, payload.websiteId, payload.pageId, payload.widget)
                .then(function(website){
                    console.log("in function callback [widget.service.server]");
                    console.log(website);
                    res.send(website.widgets);
                })
        }
       
        function findAllWidgetsForPage(req, res){

            var pid = req.params.pageId;
            var uid = req.query.userId;
            var wid = req.query.websiteId;

            // console.log(pid);
            // console.log(uid);
            // console.log(wid);

            var payload = {
                pageId: pid,
                userId : uid,
                websiteId: wid
            };
            
            return model.widgetModel
                .findWidgetsForPage(payload)
                .then(function(widgets){
                    console.log(widgets +" [widget.service.server]");
                    res.json(widgets);
                })
        }
       
        function findWidgetsByID(req, res){
            var wgid = req.params.widgetId;
            
            return model.widgetModel
                .getWidgetById(wgid)
                .then(function(widget){
                    res.json(widget);
                })
        }
       
        function updateWidget(req, res){
           
        }
       
        function deleteWidget(req, res){
            
            var wgid = req.params.widgetId;
            
            return model.widgetModel
                .deleteWidget(wgid)
                .then(function(status){
                    res.send(200);
                });
           
        }

    // widget.service.server.js
        var multer = require('multer'); // npm install multer --save
        var upload = multer({dest: __dirname + '/../../public/assignment/uploads'});


        app.post("/api/upload", upload.single('myFile'), uploadImage);


        function uploadImage(req, res) {
            console.log("in upload image");


            var widgetId = req.body.widgetId;
            var width = req.body.width;
            var myFile = req.file;


            var originalname = myFile.originalname; // file name on feature's computer
            var filename = myFile.filename;     // new file name in upload folder
            var path = myFile.path;         // full path of uploaded file
            var destination = myFile.destination;  // folder where file is saved to
            var size = myFile.size;
            var mimetype = myFile.mimetype;

            res.send(myFile);
    }
};
