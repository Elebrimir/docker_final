"use strict";

const express = require("express");

let router = express.Router();

const moviesController = require("../controllers/moviesView");
const moviesIdController = require("../controllers/moviesView_Id");

// Controlador base

//GET /movies/ - Retorna la llista de pel·lícules
router.get("/", moviesController.getMovies);

//GET /movies/inserir - Mostra el Formulari per afegir pel·lícules
router.get("/inserir", moviesController.addMoviesView);

//POST /movies/inserir - Afegeix una pel·lícula a la llista
router.post("/inserir", moviesController.postMovie);

// Controlador que li passem el parametre _id al endpoint

//GET /movies/:id - Mostra una pel·lícula en concret
router.get("/:id", moviesIdController.getMovie);

//GET /movies/update/:id - Modificar una pel·lícula
router.get("/update/:id", moviesIdController.updateMovieView);

//POST /movies/update/:id - Modificar una pel·lícula
router.post("/update/:id", moviesIdController.updateMovie);

//POST /movies/delete/:id - Eliminar una pel·lícula en concret
router.post("/delete/:id", moviesIdController.deleteMovie);

//POST /movies/:id/rate - Actualitzar la puntuació de la pel·lícula
router.post("/:id/rate", moviesIdController.rateMovie);

module.exports = router;
