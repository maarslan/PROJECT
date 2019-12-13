const express = require("express");
const router = express.Router();
const AuthHelper = require("../helpers/AuthHelper");
const MenuCtrl = require("../controllers/menu");

// router.post("/menu/add-category", AuthHelper.VerifyToken, MenuCtrl.AddCategory);
router.post("/menu/add-product", AuthHelper.VerifyToken, MenuCtrl.AddProduct);

router.get("/menu/list-products", AuthHelper.VerifyToken, MenuCtrl.getProducts);

router.put(
  "/menu/update-product/:_id",
  AuthHelper.VerifyToken,
  MenuCtrl.updateProduct
);
router.delete(
  "/menu/product/:_id",
  AuthHelper.VerifyToken,
  MenuCtrl.deleteProduct
);
module.exports = router;
