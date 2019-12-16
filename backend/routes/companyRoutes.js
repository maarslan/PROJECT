const express = require("express");
const router = express.Router();
const AuthHelper = require("../helpers/AuthHelper");
const CompanyCtrl = require("../controllers/company");

router.post(
  "/company/create-table",
  AuthHelper.VerifyToken,
  CompanyCtrl.createTables
);
router.get(
  "/company/display-tables",
  AuthHelper.VerifyToken,
  CompanyCtrl.getTables
);
router.put(
  "/company/update-table-name/:_id",
  AuthHelper.VerifyToken,
  CompanyCtrl.updateTableName
);
router.put(
  "/company/update-table-number",
  AuthHelper.VerifyToken,
  CompanyCtrl.updateTableNumber
);

module.exports = router;
