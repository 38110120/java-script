let streams = require("http");
streams.createServer(function(request, respond)
{
    respond.writeHead(200, {'content-type': 'text/plain'});
    respond.end("hi this is srikanth");
})
.listen(4000);
console.log("application server is running");