var connect = require('connect');
var serveStatic = require('serve-static');
var app = connect();
app.use(serveStatic('./build'));
app.listen(8010);