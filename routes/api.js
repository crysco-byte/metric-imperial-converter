/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route("/api/convert").get(function (req, res) {
    let input = req.query.input.toLowerCase();
    try {
      convertHandler.checkNIErr(input);
    } catch (e) {
      res.send("invalid number and input");
    }
    try {
      convertHandler.getNum(input);
    } catch (e) {
      res.send("invalid number");
    }
    try {
      convertHandler.getUnit(input);
    } catch (e) {
      res.send("invalid unit");
    }

    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.spellOutUnit(input);
    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const string = convertHandler.getString(
      initNum,
      initUnit,
      returnNum,
      returnUnit
    );

    res.json({
      initNum: initNum,
      initUnit: initUnit,
      returnNum: returnNum,
      returnUnit: returnUnit,
      string: string,
    });
  });
};
