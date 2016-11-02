module.exports = function(app) {

  app.get('/map(.html)?', function(req,res) {
    if (!req.session.user) {
      res.redirect("/login");
      return;
    }
    //send forward map.html
    res.sendFile(__dirname + "/public/map.html");
  });

  app.get('/login', function(req, res){
    res.sendFile(__dirname + "/public/login.html");
  });
};
