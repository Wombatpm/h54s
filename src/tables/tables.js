/*
* h54s tables object constructor
* @constructor
*
*@param {array} table - Table added when object is created
*@param {string} message - macro name
*
*/
function Tables(table, macroName) {
  this._tables = {};

  this.add(table, macroName);
};

/*
* Add table to tables object
* @param {array} table - Array of table objects
* @param {string} macroName - Sas macro name
*
*/
Tables.prototype.add = function(table, macroName) {
  if(table && macroName) {
    if(!(table instanceof Array)) {
      throw new h54s.Error('argumentError', 'First argument must be array');
    }
    if(typeof macroName !== 'string') {
      throw new h54s.Error('argumentError', 'Second argument must be string');
    }
    if(!isNaN(macroName[macroName.length - 1])) {
      throw new h54s.Error('argumentError', 'Macro name cannot have number at the end');
    }
  } else {
    throw new h54s.Error('argumentError', 'Missing arguments');
  }

  var result = this._utils.convertTableObject(table);

  var tableArray = [];
  tableArray.push(JSON.stringify(result.spec));
  for (var numberOfTables = 0; numberOfTables < result.data.length; numberOfTables++) {
    var outString = JSON.stringify(result.data[numberOfTables]);
    tableArray.push(outString);
  }
  this._tables[macroName] = tableArray;
};

Tables.prototype._utils = require('./utils.js');

module.exports = Tables;