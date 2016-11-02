var UserFtns = require("./UserFtns.js");
var Sighting = require("./Sighting.js");

module.exports = function(app, sightings) {

  app.get("/api/sighting", function(req, res) {
		//check if user is logged in
		if (!req.session.user) {
			res.send("error");
			return;
		}
		res.send(JSON.stringify(sightings));
	});

  app.get("/api/sighting/id/:pokemonId", function(req, res) {
    if (!req.session.user) {
      res.send("error");
      return;
    } 	// send any sightings that match the pokemon id
		res.send(
			JSON.stringify(
				sightings
				.filter(
					function(loc) {
						return loc.pokemonId == req.params.pokemonId;
					}
				)
			)
		);
	});

  app.get("/api/sighting/city/:cityName", function(req, res) {
    if (!req.session.user) {
      res.send("error");
      return;
    }
    // send any sightings that match the city name
    res.send(JSON.stringify(sightings.filter(function(loc) {
      return loc.locStr == req.params.cityName;
    })));
  });

  app.post("/api/sighting", function(req, res) {
    if (!req.session.user) {
      res.send("error");
      return;
    }
    var newLoc = new Sighting(
      req.body.locStr,
      req.body.pokemonId,
      Date.now(),
      req.session.user);
    sightings.push(newLoc);

    res.send("success");
  });

  app.post('/api/login', function(req, res){
    // TODO: Make this for more than one user
    if (UserFtns.checkLogin(req.body.username, req.body.password)) {
      // if the user logs in, we set the session
      // variable for future requests (now the user is
      // logged in)
      // and then we say that the request was a success
      req.session.user = req.body.username;
      res.send("success");
    } else {
      // If something went wrong, we just say "error"
      res.send("error");
    }
  });

  app.post('/api/logout', function(req, res){
    console.log ("reached logout");
    console.log('username = ' + req.session.user);
    req.session.user = undefined;
    res.send("success");
    console.log('username = ' + req.session.user);
    //res.redirect("/login");
  });

  app.post('/api/register', function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    if (UserFtns.userExists(username)) {
      // If the username already exists
      if (UserFtns.checkLogin(username, password)) {
        // ... and they have the right password
        // then log the user in
        req.session.user = username;
        res.send("success");
      } else {
        res.send("error");
      }
    } else {
      if(UserFtns.registerUser(username, password)) {
        req.session.user = username;
        res.send("success");
      } else {
        res.send("error");
      }
    }
  });
};
