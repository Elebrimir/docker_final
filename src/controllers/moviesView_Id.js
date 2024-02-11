"use strict";

const Movie = require("../models/movies");

//GET /movies/:id - Retorna la pel·lícula indicada per id
exports.getMovie = async (req, res) => {
  const { id } = req.params;

  try {
    let movie = await Movie.findById(id);

    return res.render("movies/pelicula", { movie });
  } catch (error) {
    res.render("error", { error });
  }
};

//GET /movies/update/:id - Mostrar formulari per actualitzar peli
exports.updateMovieView = async (req, res) => {
  const { id } = req.params;

  try {
    let movie = await Movie.findById(id);
    return res.render("movies/update", { movie });
  } catch (error) {
    res.render("error", { error });
  }
};

//POST /movies/update/:id - Actualitza la pel·lícula indicada per id
exports.updateMovie = async (req, res) => {
  const { id } = req.params;

  try {
    let movie = await Movie.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
    });
    return res.redirect("/movies");
  } catch (error) {
    const movie = new Movie(req.body); // Creem un nou objecte Movie amb les dades antigues del formulari
    // Si hi ha errors de validació, tornem a renderitzar el formulari amb els errors i les dades antigues
    res.render("movies/update", { movie, errors: error.errors });
  }
};

//POST /movies/:id - Elimina una pel·lícula indicada per id
exports.deleteMovie = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMovie = await Movie.findByIdAndDelete(id);
    console.log(deletedMovie);
    return res.redirect("/movies");
  } catch (error) {
    res.render("error", { error });
  }
};

//PATCH /movies/:id/rate - Actualitza la puntuació
exports.rateMovie = async (req, res) => {
  const { id } = req.params;
  const { action } = req.body;

  console.log(req.params);
  console.log(req.body);

  try {
    let movie = await Movie.findByIdAndUpdate(id);
    if (action === "sumar") {
      movie.rate += 1;
    } else if (action === "restar") {
      movie.rate -= 1;
    }

    await movie.save();

    return res.redirect(`/movies/${id}`);
  } catch (error) {
    res.render("error", { error });
  }
};
