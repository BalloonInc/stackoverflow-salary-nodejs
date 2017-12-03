var routes = require('express').Router();
var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/stackoverflowsurveydatabase";


routes.get('/', function(req, res) {
	var result = {};
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var query = { Country: "Belgium" };
	  db.collection("stackoverflowsurvey").find(query).toArray(function(err, result) {
	    if (err) throw err;
	    db.close();
	    res.status(200).json(result);
	  });
	});
});

module.exports = routes;