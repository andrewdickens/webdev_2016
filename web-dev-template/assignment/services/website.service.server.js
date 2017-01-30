/**
 * Created by andrewdickens on 11/6/16.
 */
module.exports = function (app, model) {
    console.log("In website.service.server");

        var websites = [
            {_id: 123, name: "Facebook", developerId: 456, description: "This is Facebook description"},
            {_id: 234, name: "Tweeter", developerId: 456, description: "This is Tweeter description"},
            {_id: 456, name: "Gizmodo", developerId: 456, description: "This is Gizmodo description"},
            {_id: 567, name: "Tic Tac Toe", developerId: 123, description: "This is Tic Tac Toe description"},
            {_id: 678, name: "Checkers", developerId: 123, description: "This is Checkers description"},
            {_id: 789, name: "Chess", developerId: 234, description: "This is Chess description"}
        ];

        app.post('/api/user/:userId/website', createWebsite);
        app.get('/api/user/:userId/website', findWebsitesForUser);
        app.get('/api/website/:websiteId', findWebsiteByID);
        app.put('/api/website/:websiteId', updateWebsite);
        app.delete('/api/website/:websiteId', deleteWebsite);

        function createWebsite(req, res){
            console.log("in createWebsite [server]");
            console.log(req.body);

            var website = req.body;
            website._user = req.params.userId;

             model.websiteModel
                .createWebsite({_id: req.params.userId}, website)
                .then(function(website){
                    console.log("**********in success callback");
                    console.log(website);
                    res.json(website);
                })
        }
      
        function findWebsitesForUser(req, res) {
            console.log("in findAllWebsitesForUser [server]");
            var uid = req.params.userId;

            model.websiteModel //todo need return?
                .findWebsitesForUser(uid)
                .then(
                    function(user){
                        console.log("success");
                        console.log(user.websites);
                        res.send(user.websites);
                    },
                    function(error){
                        console.log("error");
                        res.sendStatus(400).send(error);
                    }
                );
        }

        function findWebsiteByID(req, res) {
            var wid = req.params.websiteId;

            console.log(wid);
            return model.websiteModel
                .findWebById(wid)
                .then(function(website){
                    console.log("website is " +website);
                    res.json(website);
                })
        }
      
        function updateWebsite(){
          
        }
      
        function deleteWebsite(req, res){
            var wid = req.params.websiteId;
            
            model.websiteModel
                .deleteWebsite(wid)
                .then(function(status){
                    res.sendStatus(200);
                },
                function(error){
                    res.sendStatus(400).send(error);
                });
        }
};