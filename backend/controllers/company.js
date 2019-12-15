const mongoose = require("mongoose");
const Menu = require("../models/menuModel");
const httpStatus = require("http-status-codes");
const Company = require("../models/companyModel");

module.exports = {
  async createTables(req, res) {
    let tableArray = [];
    for (let i = 0; i < req.body.counter; i++) {
      console.log("Giriş Yapılan Sayı" + req.body.counter);
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
      });
    } catch (error) {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "display table error", error });
    }
  },
  updateTableName(req, res) {
    tableId = req.params._id;
    console.log("Güncellenecek id:" + tableId);
    Company.updateOne(
      { _id: req.company._id, "table._id": tableId },
      {
        $set: {
          "table.$": {
            name: req.body.name,
            no: req.body.no
          }
        }
      },
      { new: true }
    )
      .then(info => {
        res.status(httpStatus.OK).json({ message: "table name updated", info });
        console.log("doc: " + info + "\n" + req.body.name);
      })
      .catch(err => {
        res
          .status(httpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: "table name update error", err });
      });
  }
};
