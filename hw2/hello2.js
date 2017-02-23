(function () {
  "use strict";
  var fs = require("fs"); // require the fs library
  var readline = require("readline"); // require the readline library

  // Read in the greetings from greetings.txt
  var buffer = fs.readFileSync("greetings.txt");
  var data = buffer.toString();
  var greetings = data.split("\n");

  // Ask the user for their name
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question("What's your name? ", function(data) {
    for (var i = 0; i < 5; i++) {
      var greeting = greetings[Math.floor(Math.random() * greetings.length)];
      console.log(greeting + ", " + data.toString(16));
    }
    rl.close();
  });
})();
