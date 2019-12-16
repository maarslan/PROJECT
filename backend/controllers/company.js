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
        if (founds.length > 0) {
          console.log(founds[0].table);
          res.send(founds[0].table);
        } else {
          res.status(400).send("No doc found");
        }
      })
      .catch(err => {
        res
          .status(httpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: "error occured!", err });
      });

    //   Company.find({ _id: req.company._id }, (err, founds) => {
    //     if (err) {
    //       res
    //         .status(httpStatus.INTERNAL_SERVER_ERROR)
    //         .json({ message: "error occured!", err });
    //     }

    //     res.send(founds[0].table);
    //   });
    // } catch (error) {
    //   res
    //     .status(httpStatus.INTERNAL_SERVER_ERROR)
    //     .json({ message: "display table error", error });
    // }
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
  updateTableNumber(req, res) {
  //   Company.find({ _id: req.company._id }, (err, founds) => {
  //     console.log(".table length : " + founds[0].table.length);
  //     console.log("counter : " + req.body.counter);
  //     const counter = req.body.counter;
      
  //     if (founds[0].table.length >= req.body.counter) {
  //       for (let i = counter; i < founds[0].table.length; i++) {
  //         Company.aggregate([
  //           {$match:{_id:req.company._id}},
  //           {$pull:{table:{$concatArrays:[{name:'deneme',no:i+1}]}}}
  //         ])
          
  //       }
       
  //     } else if (founds[0].table.length <= req.body.counter) {
  //       Company.update(
  //         { "table.counter": { $exists: 1 } },
  //         { $push: { table: { $each: [], $slice: req.body.counter } } },
  //         { multi: true }
  //       )
  //         .then(data => {
  //           res
  //             .status(httpStatus.Ok)
  //             .json({ message: "Girilen daha büyük sayıya çıkarıldı", data });
  //         })
  //         .catch(err => {
  //           res
  //             .status(httpStatus.INTERNAL_SERVER_ERROR)
  //             .json({ message: "error occured", err });
  //         });
  //     }
  //   });
  // }
};
