/*
 *
 *
 *       FILL IN EACH UNIT TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]----
 *       (if additional are added, keep them at the very end!)
 */

const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  suite("Function convertHandler.getNum(input)", function () {
    test("Whole number input", function (done) {
      let input = "32L";
      assert.equal(convertHandler.getNum(input), 32);
      done();
    });

    test("Decimal Input", function (done) {
      let input = "23.4km";
      assert.equal(convertHandler.getNum(input), 23.4);
      done();
    });

    test("Fractional Input", function (done) {
      const input = "20/2km";
      assert.equal(convertHandler.getNum(input), 10);
      done();
    });

    test("Fractional Input w/ Decimal", function (done) {
      const input = "24.4/2";
      assert.equal(convertHandler.getNum(input), 12.2);
      done();
    });

    test("Invalid Input (double fraction)", function (done) {
      assert.throws(
        () => convertHandler.getNum("20/2/2"),
        "Invalid Input (double fraction)"
      );
      done();
    });

    test("No Numerical Input", function (done) {
      assert.equal(convertHandler.getNum(""), 1);
      done();
    });
  });

  suite("Function convertHandler.getUnit(input)", function () {
    test("For Each Valid Unit Inputs", function (done) {
      let input = [
        "gal",
        "l",
        "mi",
        "km",
        "lbs",
        "kg",
        "GAL",
        "L",
        "MI",
        "KM",
        "LBS",
        "KG",
      ];
      input.forEach(function (ele) {
        const regex = /\d(gal|l|lbs|kg|mi|km)$/i;
        if (regex.test(ele) === false) {
          assert.throws(
            () => convertHandler.getUnit(ele),
            "Unknown Unit Input"
          );
        } else {
          assert.equal(convertHandler.getUnit(ele), ele);
        }
      });
      done();
    });

    test("Unknown Unit Input", function (done) {
      assert.throws(() => convertHandler.getUnit("nig"));
      done();
    });
  });

  suite("Function convertHandler.getReturnUnit(initUnit)", function () {
    test("For Each Valid Unit Inputs", function (done) {
      let input = ["gal", "l", "mi", "km", "lbs", "kg"];
      let expect = ["l", "gal", "km", "mi", "kg", "lbs"];
      input.forEach(function (ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
  });

  suite("Function convertHandler.spellOutUnit(unit)", function () {
    test("For Each Valid Unit Inputs", function (done) {
      let input = ["23gal", "45l", "20km", "5mi", "6kg", "30lbs"];
      let expect = ["gal", "l", "km", "mi", "kg", "lbs"];
      input.forEach((ele, i) => {
        assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
      });
      done();
    });
  });

  suite("Function convertHandler.convert(num, unit)", function () {
    test("Gal to L", function (done) {
      let input = [5, "gal"];
      let expected = 18.92705;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test("L to Gal", function (done) {
      assert.approximately(convertHandler.convert(5, "l"), 1.32086, 0.1);
      done();
    });

    test("Mi to Km", function (done) {
      assert.approximately(convertHandler.convert(5, "Mi"), 8.0467, 0.1);
      done();
    });

    test("Km to Mi", function (done) {
      assert.approximately(convertHandler.convert(5, "km"), 3.10686, 0.1);
      done();
    });

    test("Lbs to Kg", function (done) {
      assert.approximately(convertHandler.convert(5, "lbs"), 2.1796, 0.1);
      done();
    });

    test("Kg to Lbs", function (done) {
      assert.approximately(convertHandler.convert(5, "kg"), 11.0231, 0.1);
      done();
    });
    test("get string", (done) => {
      let input = "1l";
      const num = convertHandler.getNum(input),
        unit = convertHandler.spellOutUnit(input);
      const returnNum = convertHandler.convert(num, unit),
        returnUnit = convertHandler.getReturnUnit(unit);
      assert.equal(
        convertHandler.getString(num, unit, returnNum, returnUnit),
        "1 liters converts to 0.26417 gallons"
      );
      done();
    });
  });
});
