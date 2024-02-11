"use strict";

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Model de Movie
const Movie = require("../models/movies.js");
// Model de Role
const Role = require("../models/roles.js");
// Model de User
const User = require("../models/users.js");

//Dades de Prova
const movies = require("../json/movies.json");
const role = require("../json/role.json");

//Eliminar primer les taules 'Drop If Exist"
async function eraseCollections() {
  try {
    await mongoose.connection.dropCollection("users");
    console.log("Users eliminado");
  } catch (error) {
    console.error("Error al eliminar la colección Users", error);
  }

  try {
    mongoose.connection.dropCollection("roles");
    console.log("Role eliminado");
  } catch (error) {
    console.error("Error al eliminar la colección role", error);
  }

  try {
    mongoose.connection.dropCollection("movies");
    console.log("Movies eliminado");
  } catch (error) {
    console.error("Error al eliminar la colección movies", error);
  }
}

//Inserir dades a la base de dades a partir dels fitxers JSON y crear un nou User admin
async function insertData() {
  try {
    Movie.insertMany(movies);
    console.log("Dades Movies Insertades");
  } catch (error) {
    console.log("Error al inserir les dades Movies", error);
  }

  try {
    Role.insertMany(role);
    console.log("Dades Role Insertades");
  } catch (error) {
    console.log("Error al inserir les dades Role ", error);
  }

  //Crear usuari admin

  try {
    const passwordHash = await bcrypt.hash("admin", 10);
    const role = await Role.findOne({ roleName: "Administrator" });

    if (!role) {
      throw new Error('Rol "Administrator" no encontrado');
    }

    const admin = new User({
      username: "admin",
      passwordHash: passwordHash,
      role: role._id,
    });

    await admin.save();
    console.log("Admin añadido correctamente");
  } catch {
    console.error("Error al crear al Admin", error);
  }
}

module.exports = { eraseCollections, insertData };
