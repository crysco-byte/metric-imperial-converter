/*
 *
 *
 *       Complete the handler logic below
 *
 *
 */

const testDoubleFraction = (s) => {
  let char = "/";
  let count = 0;

  for (let i = 0; i < s.length; i++) {
    if (s.charAt(i) === char) {
      count++;
    }
  }
  return count;
};

function ConvertHandler() {
  this.getNum = function (input) {
    const numReg = /([a-z]+)$/i;
    let num = input.replace(numReg, "");
    if (num === "") {
      num = 1;
    } else if (testDoubleFraction(num) > 1) {
      throw "Invalid Input (double fraction)";
    } else if (testDoubleFraction(num) === 1) {
      return eval(num);
    }
    return num;
  };

  this.getUnit = function (input) {
    const regex = /\d(gal|l|lbs|kg|mi|km)$/i;
    let noNumPrevention = "1" + input;
    if (regex.test(noNumPrevention) === false) {
      throw TypeError("Unknown Unit Input");
    }
    let res = noNumPrevention.split("");
    res.shift();
    return res.join("");
  };
  this.checkNIErr = (input) => {
    const numReg = /([a-z]+)$/i;
    const unitReg = /\d(gal|l|lbs|kg|mi|km)$/i;
    let num = input.replace(numReg, "");
    if (num === "") {
      num = 1;
    } else if (testDoubleFraction(num) > 1 && unitReg.test(input) === false) {
      throw "invalid number and unit";
    } else if (testDoubleFraction(num) === 1) {
      return true;
    }
  };

  this.getReturnUnit = function (initUnit) {
    const units = {
      gal: "l",
      l: "gal",
      lbs: "kg",
      kg: "lbs",
      mi: "km",
      km: "mi",
    };

    return units[initUnit];
  };

  this.spellOutUnit = function (unit) {
    const regex = /(gal|l|lbs|kg|mi|km)$/i;
    return unit.match(regex)[0];
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let unit = initUnit.toLowerCase();
    let result;
    switch (unit) {
      case "gal":
        result = initNum * galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "l":
        result = initNum / galToL;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      case "km":
        result = initNum / miToKm;
    }
    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    const unitNames = {
      gal: "gallons",
      lbs: "pounds",
      mi: "miles",
      l: "liters",
      kg: "kilograms",
      km: "kilometers",
    };
    return `${initNum} ${unitNames[initUnit]} converts to ${returnNum.toFixed(
      5
    )} ${unitNames[returnUnit]}`;
  };
}

module.exports = ConvertHandler;
