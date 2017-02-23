var functions = require('./functions');
var fs = require('fs');

fs.readFile('employees.json', function(err, data) {
  if (err) {
    console.log(err);
  }
  var empList = JSON.parse(data);
  fs.readFile('bonuses.json', function(err, data) {
    if (err) {
      console.log(err);
    }
    var bonuses = JSON.parse(data);
    // Apply bonuses
    var bonusedEmpList = functions.getBonusedEmployees(empList, bonuses);

    // Write out the updated employee list
    fs.writeFile('bonusedEmployees.json', JSON.stringify(bonusedEmpList), function(err) {
      if (err) {
        console.log(err);
      }
      // Write the log
      var logStr = functions.makeLog(bonusedEmpList);
      fs.writeFile('log.txt', logStr, function(err) {
        if (err) {
          console.log(err);
        }
        // Write a message to console saying we're done
        console.log("Phew...we're done!");
      });
    });
  });
});
