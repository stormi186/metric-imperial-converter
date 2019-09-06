/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('../controllers/convertHandler.js');

var convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  
  suite('Function convertHandler.getNum(input)', function() {
    
    test('Whole number input', function(done) {
      var input = '32L';
      assert.equal(convertHandler.getNum(input),32);
      done();
    });
    
    test('Decimal Input', function(done) {
      var input = '0.67L';
      assert.equal(convertHandler.getNum(input), 0.67);
      done();
    });
    
    test('Fractional Input', function(done) {
      var input = '1/5Kg';
      assert.equal(convertHandler.getNum(input), 0.2);
      done();
    });
    
    test('Fractional Input w/ Decimal', function(done) {
      var input = '2.5/10';
      assert.equal(convertHandler.getNum(input), 0.25);
      done();
    });
    
    test('Invalid Input (double fraction)', function(done) {
      var input = '4/2/10';
      assert.equal(convertHandler.getNum(input), "invalid number");
      done();
    });
    
    test('No Numerical Input', function(done) {
      var input = 'L';
      assert.equal(convertHandler.getNum(input), 1);
      done();
    }); 
    
  });
  
  suite('Function convertHandler.getUnit(input)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      let expected = ['gal', 'L', 'mi', 'km', 'lbs', 'kg', 'gal', 'L', 'mi', 'km', 'lbs', 'kg'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getUnit(ele), expected[i]);
      });
      done();
    });
    
    test('Unknown Unit Input', function(done) {
      let input = ['120.0', '12.5 pounds', '3/5kilograms'];
      input.forEach(function (ele) {        
        assert.equal(convertHandler.getUnit(ele), "invalid unit");
      });
      done();
    });  
    
  });
  
  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg'];
      var expect = ['l','gal','km','mi','kg','lbs'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
    
  });  
  
  suite('Function convertHandler.spellOutUnit(unit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      let input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG'];
      let expected = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms', 'gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.spellOutUnit(ele), expected[i]);
      });
      
      done();
    });
    
  });
  
  suite('Function convertHandler.convert(num, unit)', function() {
    
    test('Gal to L', function(done) {
      var input = [5, 'gal'];
      var expected = 18.9271;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('L to Gal', function(done) {
      let input = [5, 'L'];
      let expected = 1.32086088;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });
    
    test('Mi to Km', function(done) {
      let input = [10, 'mi'];
      let expected = 16.0934;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });
    
    test('Km to Mi', function(done) {
      let input = [20, 'km'];
      let expected = 12.4274547;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });
    
    test('Lbs to Kg', function(done) {
      let input = [12, 'lbs'];
      let expected = 5.443104;    
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);  
      done();
    });
    
    test('Kg to Lbs', function(done) {
      let input = [6, 'kg'];
      let expected = 13.22774652;    
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); 
      done();
    });
    
  });

});