"use strict";

const mongoose = require("mongoose");
const Movies = require("../models/movies");
const loadTestData = require("./loadTestData");

mongoose.connect("mongodb://127.0.0.1:27017/movies");

async function chargeData() {
  try {
    // Connexió a MongoDB
    await mongoose
      .connect("mongodb://127.0.0.1:27017/movies")
      .then(() => {
        console.log("Conectat a MongoDB");
      })
      .catch((error) => {
        console.log("Error al connectar a MongoDB ", error);
      });

    await loadTestData.eraseCollections();

    await loadTestData.insertData();

    console.log("Operaciones completadas en orden");
  } catch (error) {
    console.error("Error", error);
  }
}

chargeData();

Movies.find()
  .then((res) => {
    console.log(
      "Connexió ok, ",
      `${res.length} elements a la base de dades 'movies'`
    );
  })
  .catch((error) => {
    console.log("Error en la connexió", error);
  });
