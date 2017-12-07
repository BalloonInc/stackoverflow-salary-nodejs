const app = require('express')();
const routes = require('./routes');

app.use('/api', routes);

var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("listening at http://%s:%s", host, port)
})
