"use strict";

const jwt = require("jsonwebtoken");

//Middelware de validació
const verifyToken = (req, res, next) => {
  const token = req.get("authorization");

  if (!token) {
    return res.status(401).json({
      error: "Accés Denegat",
    });
  }
  try {
    const tokenWithoutBearer = token.substring(7);

    const verified = jwt.verify(tokenWithoutBearer, process.env.SECRET_KEY);
    req.user = verified;
    next();
  } catch (error) {
    res.status(401).json({ error: "Token no vàlid" });
  }
};

module.exports = verifyToken;
