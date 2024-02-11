"use strict";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/users");
const Role = require("../models/roles");

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({ error: "Usuari o Password no vàlid" });
  }

  const payload = { username: user.username, id: user._id, role: user.role };

  const SECRET = process.env.SECRET_KEY;

  const token = jwt.sign(payload, SECRET, { expiresIn: 60 * 30 });

  res.json({ username: user.username, role: user.role, token });
};

exports.registerUser = async (req, res) => {
  const { username, password, role } = req.body;

  const roleAssigned = await Role.findOne({ roleName: role });

  const roleCorrect = roleAssigned === null ? false : true;

  if (!roleCorrect) {
    return res.status(401).json({ error: "Rol no vàlid" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  try {
    const newUser = await User.create({
      username: username,
      passwordHash: passwordHash,
      role: roleAssigned._id,
    });

    res.status(201).json({ username: newUser.username, role: newUser.role });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Ha hagut un error en el registre de l'usuari" });
  }
};
