const jwt = require("jsonwebtoken");
const dbConfig = require("../config/secret");
const httpStatus = require("http-status-codes");
module.exports = {
  VerifyToken: (req, res, next) => {
    if (!req.headers.authorization) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "No Authorization" });
    }
    const token = req.cookies.auth || req.headers.authorization;
    console.log(token);

    if (!token) {
      return res
        .status(httpStatus.FORBIDDEN)
        .json({ message: "no valid token" });
    }
    return jwt.verify(token, dbConfig.secret, (err, decoded) => {
      if (err) {
        if (err.expiredAt < new Date()) {
          return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .json({ message: "Token expired..Login again!", token: null });
        }
        next();
      }
      req.company = decoded.data;
      next();
    });
  }
};
