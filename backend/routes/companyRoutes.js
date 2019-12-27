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
  "/company/add-a-table",
  AuthHelper.VerifyToken,
  CompanyCtrl.addATable
);
router.put(
  "/company/remove-a-table",
  AuthHelper.VerifyToken,
  CompanyCtrl.removeATable
);
router.put(
  "/company/company-info-update",
  AuthHelper.VerifyToken,
  CompanyCtrl.updateCompanyInfo
);
router.put(
  "/company/founder-info-update",
  AuthHelper.VerifyToken,
  CompanyCtrl.updateFounderInfo
);
router.put(
  "/company/change-password",
  AuthHelper.VerifyToken,
  CompanyCtrl.ChangePassword
);
router.post(
  "/company/upload-image",
  AuthHelper.VerifyToken,
  CompanyCtrl.UploadImage
);
module.exports = router;
