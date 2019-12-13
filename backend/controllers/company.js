const mongoose = require("mongoose");
const Menu = require("../models/menuModel");
const httpStatus = require("http-status-codes");
const Company = require("../models/companyModel");

module.exports = {
  async createTables(req, res) {
    let tableArray = [];
    for (let i = 0; i < req.body.counter; i++) {
      Company.findOneAndUpdate(
        { _id: req.company._id },
        {
          $push: { table: { name: "deneme", no: i + 1 } }
        },
        { upsert: true, new: true }
      )
        .then(data => {
          tableArray.push(data);
        })
        .catch(err => {
          console.log(err);
        });
    }
    res.send(tableArray);
  },
  getTables(req, res) {
    try {
      Company.find({ _id: req.company._id }, (err, founds) => {
        if (err) {
          res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .json({ message: "error occured!", err });
        }
        res.send(founds[0].table);
        console.log(founds[0].table);
      });
    } catch (error) {}
  }
};
