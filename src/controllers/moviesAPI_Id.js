"use strict";

const Movie = require("../models/movies");

//GET /api/v1/movies/:id - Retorna la pel·lícula indicada per id
exports.getMovie = async (req, res) => {
  const { id } = req.params;

  try {
    let movie = await Movie.findById(id);

    if (!movie) {
      return res
        .status(404)
        .send(`No s'ha trobat cap pel·lícula amb l'ID ${id}`);
    }

    return res.json(movie);
  } catch (error) {
    res.status(404).send(error);
  }
};

//PATCH /api/v1/movies/update/:id - Actualitza la pel·lícula per el id
exports.updateMovie = async (req, res) => {
  const { id } = req.params;

  try {
    let movie = await Movie.findByIdAndUpdate(id, req.body);
    if (!movie) {
      return res
        .status(404)
        .send(`No s'ha trobat cap pel·lícula amb l'ID ${id}`);
    }

    return res.json({
      message: "La pel·lícula ha estat actualitzada correctament",
      movie,
    });
  } catch (error) {
    res.status(404).send(error);
  }
};

//GET /api/v1/movies/:id/rate - Obtidre tots els comentaris
exports.getRate = async (req, res) => {
  const { id } = req.params;

  try {
    let rate = await Movie.findById(id);

    if (!rate) {
      return res
        .status(404)
        .send("No hi ha una valoració per aquesta pel·lícula");
    }

    return res.json(rate.rate);
  } catch (error) {
    res.status(404).send(error);
  }
};

//PATCH /api/v1/movies/:id/rate - Actualitza la puntuació
exports.rateMovie = async (req, res) => {
  const { id } = req.params;
  const { action } = req.body;

  console.log("Estic en API", req.params);
  console.log(action);

  try {
    let movie = await Movie.findById(id);

    if (action === "sumar") {
      movie.rate += 1;
    } else if (action === "restar") {
      movie.rate -= 1;
    }

    await movie.save();

    res.json({
      succes: true,
      message: "Puntuació actualitzada exitosamente",
      movie,
    });
  } catch (error) {
    res
      .status(500)
      .json({ succes: false, message: "Error al actualitzar la puntuació" });
  }
};

//POST /api/v1/movies/:id/comment - Afegir comentari
exports.commentMovie = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;

  console.log("Estic en API", req.params);
  console.log(req.body);

  try {
    let movie = await Movie.findById(id);
    if (!movie) {
      return res
        .status(404)
        .send(`No s'ha trobat cap pel·lícula amb l'ID ${id}`);
    }

    const { nick, commentText } = req.body;
    if (!nick || !commentText) {
      return res
        .status(400)
        .json({ success: false, message: "Falta información del comentario" });
    }
    const newComment = { nick, commentText };

    console.log(newComment);

    movie.comments.push(newComment);

    await movie.save();

    res.json({
      succes: true,
      message: "Comentari afegit exitosamente",
      movie,
    });
  } catch (error) {
    res
      .status(500)
      .json({ succes: false, message: "Error al introduir el comentari" });
  }
};

//DELETE /api/v1/movies/delete/:id - Elimina una pel·lícula per el id
exports.deleteMovie = async (req, res) => {
  const { id } = req.params;

  try {
    let movie = await Movie.findByIdAndDelete(id);
    if (!movie) {
      return res
        .status(404)
        .send(`No s'ha trobat cap pel·lícula amb l'ID ${id}`);
    }
    return res.json({
      message: `S'ha eliminat la pel·lícula: ${movie.title}`,
    });
  } catch (error) {
    res.status(404).send(error);
  }
};
