const math = require('mathjs');

function ConvertHandler() {
  
  this.getNum = function(input) {
    var indexOfUnits = input.search(/[a-zA-Z]/);
    var numbers;

    if (indexOfUnits == -1) {
      numbers = input;
    }
    else {
      numbers = input.substring(0, indexOfUnits);
    }
    if (numbers.length == 0) {
      numbers = "1"; 
    };
    if (numbers.split(/\//).length > 2) return "invalid number";

    return math.evaluate(numbers);
  };
  
  this.getUnit = function(input) {
    var indexOfUnits = input.search(/[\sa-zA-Z]/);

    var units = input.substring( indexOfUnits, input.length);

    var acceptable = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
    var outputUnits = ['gal', 'L', 'mi', 'km', 'lbs', 'kg', 'gal', 'L', 'mi', 'km', 'lbs', 'kg'];

    var acceptableIndex = acceptable.indexOf(units);

    if ( acceptableIndex >= 0 ) {
      return outputUnits[acceptableIndex];
    }
    else {

      return "invalid unit";
    }
  };
  
  this.getReturnUnit = function(initUnit) {
    var input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
    var output = ['l','gal','km','mi','kg','lbs', 'L', 'gal', 'km', 'mi', 'kg', 'lbs'];

    var inputIndex = input.indexOf(initUnit);
    if (inputIndex >= 0) {
      return output[inputIndex];
    }
    else {
      return "invalid unit";
    }
  };

  this.spellOutUnit = function(unit) {
    var input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG'];
    var output = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms', 'gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
    
    var inputIndex = input.indexOf(unit);

    if (inputIndex >= 0) {
      return output[inputIndex];
    }
    else {
      return 'invalid unit';
    }
  };
  
  this.convert = function(initNum, initUnit) {
    const rates = {
      gal: 3.78541,
      L: 1/3.78541,
      lbs: 0.453592,
      kg: 1/0.453592,
      mi: 1.60934,
      km: 1/1.60934
    }

    var conversion = parseFloat( (initNum * rates[initUnit]).toFixed(5) );
       
    if (initNum == "invalid number" && initUnit == "invalid unit") {
      return "invalid number and unit";
    }
    else if (initNum == "invalid number") {
      return "invalid number";
    }
    else if (initUnit == "invalid unit") {
      return "invalid unit";
    }

    else {
      return conversion;
    }
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${this.convert(initNum, initUnit)} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;
