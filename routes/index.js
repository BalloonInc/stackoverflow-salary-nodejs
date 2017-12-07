var routes = require('express').Router();
var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/stackoverflowsurveydatabase";

routes.get('/salary/:country', function(req, res) {
	var country = req.params['country'];
	var result = {};
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var query = { _id: { $in : [country]} };
	  db.collection("stackoverflowsurvey").aggregate([{$match: {Country: {'$regex' : '^'+country+'$', '$options' : 'i'} }},{$group: {_id:"$Country", average: {$avg:"$Salary"} } }]).toArray(function(err, result) {
	    if (err) throw err;
	    db.close();
	    res.status(200).json(result);
	  });
	});
});

module.exports = routes;