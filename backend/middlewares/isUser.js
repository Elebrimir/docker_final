"use strict";

const Role = require("../models/roles");

async function isUser(req, res, next) {
  try {
    const userRole = await Role.findOne({ roleName: "User" });
    const superUserRole = await Role.findOne({ roleName: "Superuser" });
    const administratorRole = await Role.findOne({ roleName: "Administrator" });

    if (!userRole || !superUserRole || !administratorRole) {
      return res.status(500).json({ message: "Error interno del servidor" });
    }

    // Comparar la ID del rol 'User' amb el valor del camp 'role' de l'usuari

    if (
      (req.user && req.user.role.toString() === userRole._id.toString()) ||
      (req.user && req.user.role.toString() === superUserRole._id.toString()) ||
      (req.user &&
        req.user.role.toString() === administratorRole._id.toString())
    ) {
      return next(); // Permitir acces
    } else {
      return res.status(403).json({ message: "Acceso no autorizado" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

module.exports = isUser;
