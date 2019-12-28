const mongoose = require("mongoose");

const httpStatus = require("http-status-codes");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dbConfig = require("../config/secret");
const Company = require("../models/companyModel");

module.exports = {
  async CreateUser(req, res) {
    const userData = req.body;
    const userMail = await User.findOne({ email: userData.email });
    const username = await User.findOne({ username: userData.username });

    if (userMail || username) {
      return res
        .status(httpStatus.CONFLICT)
        .json({ message: "email or username already exists!" });
    } else {
      return bcrypt.hash(userData.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({ message: "eror hashing password" });
        } else {
          const body = {
            username: userData.username,
            email: userData.email,
            password: hash
          };
          User.create(body)
            .then(user => {
              const token = jwt.sign({ data: user }, dbConfig.secret, {
                expiresIn: "5h"
              });
              res.cookie("auth", token);
              res.status(200).send({
                message: "user created successfully",
                user,
                token
              });
            })
            .catch(err => {
              res
                .status(httpStatus.INTERNAL_SERVER_ERROR)
                .json({ message: "error occured" }, err);
              console.log(err);
            });
        }
      });
    }
  },
  async LoginUser(req, res) {
    if (!req.body.email || !req.body.password) {
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "No empty field allowed!" });
    } else {
      await User.findOne({ email: req.body.email })
        .then(user => {
          if (!user) {
            return res
              .status(httpStatus.NOT_FOUND)
              .json({ message: "user  not found!" });
          } else {
            return bcrypt
              .compare(req.body.password, user.password)
              .then(result => {
                if (!result) {
                  return res
                    .status(httpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "Password is INCORRECT!" });
                }
                const token = jwt.sign({ data: user }, dbConfig.secret, {
                  expiresIn: "5h"
                });
                res.cookie("auth", token);
                return res
                  .status(httpStatus.OK)
                  .json({ message: "Successfully logged in", user, token });
              });
          }
        })
        .catch(err => {
          console.log(err);
          return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .json({ message: "error occured!" });
        });
    }
  },
  GetAllCompanies(req, res) {
    Company.find({}, (err, founds) => {
      if (err) {
        res
          .status(httpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: "Companies cannot be displayed!", err });
      }
      console.log(founds);
      res.send(founds);
    });
  },
  GetSelectedCompany(req, res) {
    _id = req.params.id;
    console.log("ID : " + req.params.id);
    Company.find({ _id: req.params.id }, (err, founds) => {
      if (err) {
        res
          .status(httpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: "Selected Company cannot be displayed!", err });
      }
      console.log(founds);
      res.send(founds);
    });
  }
};
