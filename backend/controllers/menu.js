const mongoose = require("mongoose");
const Menu = require("../models/menuModel");
const httpStatus = require("http-status-codes");
const Company = require("../models/companyModel");

module.exports = {
  AddProduct(req, res) {
    const body = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      imageUrl: req.body.image,
      state: req.body.state,
      category: req.body.category
    };
    try {
      Menu.findOneAndUpdate(
        { company: req.company._id },
        {
          $push: { products: body }
        },
        { new: true, upsert: true }
      )
        .then(data => {
          res.status(httpStatus.CREATED).json({ message: "created!", data });
          console.log(data);
        })
        .catch(err => {
          res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .json({ message: "add-product error", err });
        });
    } catch (error) {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "error occured!", err });
    }
  },

  async getProducts(req, res) {
    try {
      await Menu.find({ company: req.company._id }, (err, founds) => {
        if (err) {
          res
            .send(httpStatus.INTERNAL_SERVER_ERROR)
            .json({ message: "List Products Error", err });
        }
        res.send(founds[0].products);
        console.log("Bu productslar: " + founds[0].products);
      });
    } catch (error) {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "product update error", error });
    }
  },
  updateProduct(req, res) {
    Menu.update(
      { company: req.company._id, "products._id": req.params._id },
      {
        $set: {
          "products.$": {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category
          }
        }
      },
      { new: true }
    )
      .then(info => {
        res.status(httpStatus.OK).json({ message: "product updated", info });
      })
      .catch(err => {
        res
          .status(httpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: "product update error", err });
      });
  },
  deleteProduct(req, res) {
    console.log("Req params: ", req.params);

    const productId = req.params._id;

    Menu.findOneAndUpdate(
      { company: req.company._id },
      {
        $pull: { products: { _id: productId } }
      },
      { new: true }
    )
      .then(info => {
        console.log("doc: ", info);
        res.status(200).json({ message: "product deleted", info });
      })
      .catch(err => {
        console.log("Error: ", err);
        res.status(500).json({ message: "error occured!" });
      });
  }
};

// .then(info => {
//   res.status(httpStatus.OK).json({ message: "product updated", info });
// })
// .catch(err => {
//   res
//     .status(httpStatus.INTERNAL_SERVER_ERROR)
//     .json({ message: "product update error", err });
// });
