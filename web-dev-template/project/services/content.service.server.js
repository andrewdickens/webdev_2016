/**
 * Created by andrewdickens on 12/4/16.
 */
module.exports = function (app, model) {

    console.log("in project content.service.server.js");

    app.get("/api/content/:placement", getContent);
    app.post("/api/content/update", updateContent);
    
    function getContent(req, res){
        
        var placement = req.params.placement;
        
        return model.contentModel
            .getContent(placement)
            .then(function(text){
                // console.log(text);
                res.json(text)
            });
    }
    
    function updateContent(req, res){
        var payload = req.body;
        var placement = payload.placement;
        var content = payload.content;
        
        console.log(placement);
        
        return model.contentModel
            .updateContent(payload)
            .then(function(){
                res.send(200);
            })
    }

};
