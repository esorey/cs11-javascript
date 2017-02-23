(function (){
  "use strict";
  var fs = require("fs"); // require the fs library
  var readline = require("readline"); // require the readline library
  var http = require("http"); // require the http library
  var url = require("url"); // require the url library

  // Read in the greetings from greetings.txt
  fs.readFile("greetings.txt", function(err, body) {
    if (err === null) { // no error
       // Parse the greetings
       var data = body.toString();
       var greetings = data.split("\n");
       var num_greetings = greetings.length

       // Make an http server on port 8080
       var server = http.createServer(function(req, res) {
         var query = url.parse(req.url, true).query;

         // Get a random greeting
         var greeting = greetings[Math.floor(Math.random() * greetings.length)];

         // Check if the query.name field is populated
         if (query.name === undefined) {
           // Print a random greeting
           res.end(greeting);
         }
         else {
           // Send a personalized greeting!
           res.end(greeting + ", " + query.name);
         }
       });

       // Listen on 8080
       server.listen(8080);

    } else {
       // print the error to the terminal
       console.log(err);
    }
  });
})();
