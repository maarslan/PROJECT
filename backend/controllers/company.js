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
      Company.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(req.company._id)
          }
        },
        {
          $unwind: "$table"
        },
        {
          $sort: {
            "table.no": 1 //1 (for ascending) or -1 (for descending)
          }
        },
        {
          $group: {
            _id: "$_id",
            table: {
              $push: "$table"
            }
          }
        }
      ])
        .then(founds => {
          if (founds[0].table.length > 0) {
            console.log(founds[0].table);
            res.send(founds[0].table);
          } else {
            res.status(400).send("Empty Table Error");
            console.log("Boş array : " + founds[0].table);
          }
        })
        .catch(err => {
          res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .json({ message: "error occured!", err });
          console.log(err);
        });
    } catch (error) {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Display Tables Error Occured!", error });
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
  },
  addATable(req, res) {
    Company.find({ _id: req.company._id }, (err, founds) => {
      console.log("Body'den gelen : " + req.body.length);

      Company.findByIdAndUpdate(
        { _id: req.company._id },
        {
          $push: { table: { name: "deneme", no: founds[0].table.length + 1 } }
        }
      )
        .then(data => {
          console.log("docs : " + data);
          res
            .status(httpStatus.OK)
            .json({ message: "A new table added!", data });
        })
        .catch(err => {
          res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .json({ message: "Table Add Error", data });
          console.log(err);
        });
    });
  },
  removeATable(req, res) {
    Company.find({ _id: req.company._id }, (err, founds) => {
      console.log("Body'den gelen : " + req.body.length);

      Company.findByIdAndUpdate(
        { _id: req.company._id },
        {
          $pop: { table: 1 }
        }
      )
        .then(data => {
          console.log("docs : " + data);
          res
            .status(httpStatus.OK)
            .json({ message: "last table removed!", data });
        })
        .catch(err => {
          res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .json({ message: "Table remove Error", err });
          console.log(err);
        });
    });
  }
};
