"use strict";

const Movie = require("../models/movies");
const crypto = require("crypto");
const { moviesGets } = require("../utils/queryFunctions");

//GET /api/v1/movies - Retorna la llista de pel·lícules
exports.getMovies = async (req, res) => {
  const { genre } = req.query;
  const { fromYear } = req.query;
  const { toYear } = req.query;
  const { rate } = req.query;

  try {
    const movies = await Movie.find({});

    let moviesFiltered = moviesGets(movies, genre, fromYear, toYear, rate);

    return res.json(moviesFiltered);
  } catch (error) {
    res.send(error);
  }
};

// POST /api/v1/movies - Afegeix una pel·lícula
exports.postMovie = async (req, res) => {
  if (!req.body || !req.body.title) {
    return res.status(400).json({ error: "Falten dades en la sol·licitud" });
  }

  const { title, year, director, duration, genre, rate } = req.body;
  const id = crypto.randomUUID();

  try {
    const newMovie = await Movie.create({
      id,
      title,
      year,
      director,
      duration,
      genre,
      rate,
    });
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(400).json({ error: "Ha hagut un error al crear la pel·lícula" });
  }
};
