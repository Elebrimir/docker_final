"use strict";

const Movie = require("../models/movies");
const crypto = require("crypto");
const { moviesGets } = require("../utils/queryFunctions");

//GET /movies - Retorna la llista de pel·lícules
exports.getMovies = async (req, res) => {
  const { genre } = req.query;
  const { fromYear } = req.query;
  const { toYear } = req.query;
  const { rate } = req.query;

  try {
    const movies = await Movie.find({});

    let moviesFiltered = moviesGets(movies, genre, fromYear, toYear, rate);

    return res.render("movies/llistar", { movies: moviesFiltered });
  } catch (error) {
    res.render("error");
  }
};

//GET /movies/inserir - Retorna la vista del Formulari
exports.addMoviesView = async (req, res) => {
  try {
    res.render("movies/inserir");
  } catch (error) {
    res.render("error");
  }
};

// POST /movies/inserir - Afegeix una pel·lícula
exports.postMovie = async (req, res) => {
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
    res.redirect("/movies");
  } catch (error) {
    console.error("Error creating movie:", error);
    res.status(500).json({ error: "Ha habido un error al crear la película" });
  }
};