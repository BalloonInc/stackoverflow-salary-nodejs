var routes = require('express').Router();
var dataForge = require('data-forge');


var dataFrame = dataForge.readFileSync('assets/survey_results_public.csv').parseCSV();

var columnSubset = dataFrame.subset(["Country", "Salary"]);
console.log(columnSubset.skip(10).take(20).toString()); 


var myAgg = function(prevValue, nextValue) {
	return 5.;
}

routes.get('/', function(req, res) {
	var summarized = columnSubset
		.groupBy(row => row.Country)
		.select(group => ({
			Country: group.first().Country,

			// Sum sales per client.
			Sum: group.select(row => row.Salary).aggregate(0, (prevValue, nextValue) => myAgg(prevValue, nextValue)),
		}))
		.inflate() // Series -> dataframe.
		.toArray(); // Convert to regular JS array.
  res.status(200).json(summarized);
});

module.exports = routes;