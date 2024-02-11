"use strict";

const express = require("express");

//Middelwares
const verifyToken = require("../middlewares/validate-tokens");
const isAdmin = require("../middlewares/isAdmin");
const isSuperuser = require("../middlewares/isSuperuser");
const isUser = require("../middlewares/isUser");
const isGuest = require("../middlewares/isGuest");

let router = express.Router();

const moviesController = require("../controllers/moviesAPI");
const moviesIdController = require("../controllers/moviesAPI_Id");

// Controlador base

//GET /api/v1/movies/ - Retorna la llista de pel·lícules
router.get("/", moviesController.getMovies);

//POST /api/v1/movies/create - Afegeix una pel·lícula a la llista
router.post("/create", verifyToken, isUser, moviesController.postMovie);

// Controlador que li passem el parametre _id al endpoint

//GET /api/v1/movies/:id - Retorna una pel·lícula en concret
router.get("/:id", moviesIdController.getMovie);

//GET /api/v1/movies/:id/rate - Retorna les puntuacions
router.get('/:id/rate',verifyToken,isGuest, moviesIdController.getRate);

//POST /api/v1/movies/:id/rate - Modificar Comentaris
router.patch("/:id/rate", verifyToken, isGuest, moviesIdController.rateMovie);

//PATCH /api/v1/movies/:id/comment - Modificar Puntuació
router.post("/:id/comment", verifyToken, isUser, moviesIdController.commentMovie);

//PATCH /api/v1/movies/update/:id - Modificar una pel·lícula
router.patch("/update/:id", verifyToken, isSuperuser, moviesIdController.updateMovie);


//DELETE /api/v1/movies/delete/:id - Eliminar una pel·lícula en concret
router.delete("/delete/:id", verifyToken, isAdmin, moviesIdController.deleteMovie
);

module.exports = router;
