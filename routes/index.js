var routes = require('express').Router();
var MongoClient = require('mongodb').MongoClient;

// use the shell script init_db.sh to insert the data in a mongodb
var url = "mongodb://localhost:27017/stackoverflowsurveydatabase";

routes.get('/salary/:country', function(req, res) {
	var country = req.params['country'];
	var result = {};
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var query = { _id: { $in : [country]} };
	  db.collection("stackoverflowsurvey")
		.aggregate(
			[{$match: {Country: {'$regex' : '^'+country+'$', '$options' : 'i'} }},
			{$group: {_id:"$Country", average: {$avg:"$Salary"} } }])
		.toArray(function(err, result) {
	    if (err) throw err;
	    db.close();
	    res.status(200).json(result);
	  });
	});
});

routes.get('/age/:country', function(req, res) {
	var country = req.params['country'];
	var result = {};
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var query = { _id: { $in : [country]} };
	  db.collection("stackoverflowsurvey")
		.aggregate(
			[{$match: {Country: {'$regex' : '^'+country+'$', '$options' : 'i'} }},
			{$group: {_id:"$Country", average: {$avg:"$Age"} } }])
		.toArray(function(err, result) {
	    if (err) throw err;
	    db.close();
	    res.status(200).json(result);
	  });
	});
});


module.exports = routes;
