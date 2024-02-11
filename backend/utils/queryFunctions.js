"use strict";

function moviesGets(movies, genre, fromYear, toYear, rate) {
  // Per a ordenar per genere
  if (genre) {
    let moviesByGenre = movies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
    );
    return moviesByGenre;
  }

  // Per a obtindre dins d'un interval de anys
  if (fromYear && toYear) {
    //Ordenem per anys de menys a més
    const sortMovies = movies.sort((a, b) => a.year - b.year);

    //Filtrem l'array entre les dos dades
    let moviesBetweenYears = sortMovies.filter(
      (sortMovie) => sortMovie.year >= fromYear && sortMovie.year <= toYear
    );

    return moviesBetweenYears;
  }

  // Per a ordenar per Puntuació(rate)
  if (rate) {

    //Ordenem per rate amb sort de major a menor
    if (rate === "descent") {
      let rateDescent = movies.sort((a, b) => b.rate - a.rate);
      return rateDescent;
    } else if (rate === "ascent") {
      let rateAscend = movies.sort((a, b) => a.rate - b.rate);
      return rateAscend;
    }
  }

  //Llistat de totes les pel·lícules
  return movies;
}

module.exports = { moviesGets };
