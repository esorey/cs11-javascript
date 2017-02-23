var functions = require('./functions');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

var empList = fs.readFileAsync('employees.json');
var bonuses = fs.readFileAsync('bonuses.json');

// Call this callback when both empList and bonuses are ready...
Promise.all([empList, bonuses]).spread(function(empList, bonuses) {
  empList = JSON.parse(empList);
  bonuses = JSON.parse(bonuses);
  // Write out the bonused employees
  var bonusedEmpList = functions.getBonusedEmployees(empList, bonuses);
  return bonusedEmpList;
}).then(function(bonusedEmpList) {
  fs.writeFileAsync('bonusedEmployees.json', JSON.stringify(bonusedEmpList));
  return bonusedEmpList;
}).then(function(bonusedEmpList) {
  // Write the log
  var logStr = functions.makeLog(bonusedEmpList);
  return fs.writeFileAsync('log.txt', logStr);
}).then(function() {
  // Write a message to console saying we're done
  console.log("Phew...we're done!");
});
