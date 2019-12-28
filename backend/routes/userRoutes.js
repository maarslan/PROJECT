const express = require("express");
const router = express.Router();
const AuthUserHelper = require("../helpers/AuthUserHelper");
const userCtrl = require("../controllers/users");

router.post("/app/register", userCtrl.CreateUser);
router.post("/app/login", userCtrl.LoginUser);
router.get(
  "/app/display-companies",
  AuthUserHelper.VerifyToken,
  userCtrl.GetAllCompanies
);
router.get(
  "/app/display-selected-company/:id",
  AuthUserHelper.VerifyToken,
  userCtrl.GetSelectedCompany
);
module.exports = router;
