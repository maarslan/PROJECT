const mongoose = require("mongoose");
const Menu = require("../models/menuModel");
const httpStatus = require("http-status-codes");
const Company = require("../models/companyModel");

module.exports = {
  // AddCategory(req, res) {
  //   Menu.findOneAndUpdate(
  //     { company: req.company._id },
  //     { $push: { category: { name: req.body.category } } },
  //     { upsert: true, new: true },
  //     (err, result) => {
  //       if (err) {
  //         res
  //           .status(httpStatus.INTERNAL_SERVER_ERROR)
  //           .json({ message: "Add Category Hatası" });
  //       }
  //       res
  //         .status(httpStatus.CREATED)
  //         .json({ message: "Category Created", result });
  //     }
  //   );
  // },
  AddProduct(req, res) {
    const body = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      imageUrl: req.body.image,
      state: req.body.state,
      category: req.body.category
    };

    // Menu.find({ company: req.company._id }, (err, founds) => {
    // const CatName = req.body.category;

    // const data = founds[0].category;

    //   for (let i = 0; i < data.length; i++) {
    //     if (data[i].name == CatName) {
    //       console.log(CatName);
    //       Menu.update(
    //         { company: req.company._id, "category._id": data[i]._id },
    //         {
    //           $push: { "category.$.products": body }
    //         },
    //         { upsert: true, new: true }
    //       )
    //         .then(info => {
    //           res
    //             .status(httpStatus.CREATED)
    //             .json({ message: "created!", info });
    //           console.log(info);
    //         })
    //         .catch(err => {
    //           res
    //             .status(httpStatus.INTERNAL_SERVER_ERROR)
    //             .json({ message: "add-product error", err });
    //         });
    //     }
    //   }
    // });
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
  },
  getCategories(req, res) {
    // Menu.find({ company: req.company._id }, (err, founds) => {
    //   if (err) {
    //     res
    //       .status(httpStatus.CREATED)
    //       .json({ message: "Listing Category Error", err });
    //   }
    //   data = founds[0].products.category;
    //   res.send(data);
    //   console.log(data);
    // });
  },
  getProducts(req, res) {
    Menu.find({ company: req.company._id }, (err, founds) => {
      if (err) {
        res
          .status(httpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: "Listing Products Error", err });
      }
      res.send(founds[0].products);
      console.log("Bu productslar: " + founds[0].products);
    });

    // Menu.find({ company: req.company._id }, (err, founds) => {
    //   if (err) {
    //     res
    //       .status(httpStatus.CREATED)
    //       .json({ message: "Listing Products Error", err });
    //   }
    //   data = founds[0].category;
    //   const productsArray = [];

    //   for (let i = 0; i < founds[0].products.length; i++) {
    //     products = founds[0].category[i].products;
    //     console.log("İlk For Products'ı : " + products);
    //     for (let n = 0; n < products.length; n++) {
    //       if (founds[0].category[i].products[n]._id) {
    //         allProducts = founds[0].category[i].products[n];
    //         productsArray.push(allProducts);
    //       }
    //     }
    //   }
    //   console.log("bu productstır: " + productsArray);
    //   res.send(productsArray);

    //   res.send(founds[0]);
    // });
  },
  updateProduct(req, res) {
    Menu.update(
      { company: req.company._id, "products._id": req.body._id },
      {
        $set: {
          "products.$": {
            _id: req.body._id,
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
