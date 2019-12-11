const HttpStatus = require("http-status-codes");
const Company = require("../models/companyModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dbConfig = require("../config/secret");

module.exports = {
  async CreateCompany(req, res) {
    const companyData = req.body;
    const companyMail = await Company.findOne({ email: companyData.email });
    const contractNo = await Company.findOne({
      contractNo: companyData.contractNo
    });

    if (companyMail || contractNo) {
      return res
        .status(HttpStatus.CONFLICT)
        .json({ message: "email or contractNo already exists!" });
    } else {
      return bcrypt.hash(companyData.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({ message: "eror hashing password" });
        } else {
          const body = {
            contractNo: companyData.contractNo,
            email: companyData.email,
            password: hash
          };
          Company.create(body)
            .then(company => {
              const token = jwt.sign({ data: company }, dbConfig.secret, {
                expiresIn: "1h"
              });
              res.cookie("auth", token);
              res.status(HttpStatus.CREATED).send({
                message: "company created successfully",
                company,
                token
              });
            })
            .catch(err => {
              res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send({ message: "error occured" });
            });
        }
      });
    }
  },
  async LoginCompany(req, res) {
    if (!req.body.contractNo || !req.body.password) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "No empty field allowed!" });
    } else {
      await Company.findOne({ contractNo: req.body.contractNo })
        .then(company => {
          if (!company) {
            return res
              .status(HttpStatus.NOT_FOUND)
              .json({ message: "company  not found!" });
          } else {
            return bcrypt
              .compare(req.body.password, company.password)
              .then(result => {
                if (!result) {
                  return res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Password is INCORRECT!" });
                }
                const token = jwt.sign({ data: company }, dbConfig.secret, {
                  expiresIn: "1h"
                });
                res.cookie("auth", token);
                return res
                  .status(HttpStatus.OK)
                  .json({ message: "Successfully logged in", company, token });
              });
          }
        })
        .catch(err => {
          return res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ message: "error occured!" });
        });
    }
  }
};
