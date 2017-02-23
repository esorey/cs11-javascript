var getBonusedEmployees = function getBonusedEmployees(empList, empBonuses) {
  /* Gets a list of bonused employees from a list of employees and
   * a map of employee ids and bonus bools.
   */
  var bonusedEmps = [];
  
  for (var i = 0; i < empList.length; i++) {
    var currEmp = empList[i];
    var currId = currEmp['id'];
    var getsBonus = empBonuses[currId];

    // Check if this employee is receiving a bonus
    if (getsBonus) {
      // Calculate the new salary
      var currSalary = currEmp['salary'];
      var yearsWorking = currEmp['yearsWorking'];
      var newSalary = currSalary + (1000 * yearsWorking);

      // Create the new employee object and add it to the list
      var empName = currEmp['name'];
      var bonusedEmp = {'id': currId,
                        'name': empName,
                        'yearsWorking': yearsWorking,
                        'salary': newSalary};
      bonusedEmps.push(bonusedEmp);
    }
  }
  return bonusedEmps;
};

var makeLog = function makeLog(bonusedEmpList) {
  /* Returns a string that has a line for each employee in bonusedEmpList,
   * indicating the employee's full name and bonused salary.
   */
   var logStr = '';
   for (var i = 0; i < bonusedEmpList.length; i++) {
     var currEmp = bonusedEmpList[i];
     var firstName = currEmp['name']['first'];
     var lastName = currEmp['name']['last'];
     var salaryStr = currEmp['salary'].toString();
     logStr += firstName + ' ' + lastName + ' ' + salaryStr + '\n';
   }
   return logStr;
};

// Export the module
module.exports = {
  getBonusedEmployees: getBonusedEmployees,
  makeLog: makeLog
};
