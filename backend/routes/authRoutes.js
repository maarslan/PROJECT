const express = require("express");
const router = express.Router();

const authCtrl = require("../controllers/auth");

router.post("/register", authCtrl.CreateCompany);
router.post("/login", authCtrl.LoginCompany);
module.exports = router;
