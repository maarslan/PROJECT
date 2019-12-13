const express = require("express");
const router = express.Router();
const AuthHelper = require("../helpers/AuthHelper");
const CompanyCtrl = require("../controllers/company");

router.post(
  "/menu/create-table",
  AuthHelper.VerifyToken,
  CompanyCtrl.createTables
);
router.get(
  "/menu/display-tables",
  AuthHelper.VerifyToken,
  CompanyCtrl.getTables
);

module.exports = router;
