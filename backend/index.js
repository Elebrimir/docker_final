"use strict";

const express = require("express");
const mongoose = require("mongoose");
const nunjucks = require("nunjucks");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv").config();

const moviesRouterView = require("./routes/moviesView");
const moviesRouterAPI = require("./routes/moviesAPI");
const usersRoutesAPI = require("./routes/users");

const app = express();
const port = process.env.PORT;
const host = process.env.HOST;

mongoose.connect(process.env.ATLAS_URI);

nunjucks.configure("views", { autoescape: true, express: app });

app.set("view engine", "njk");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/movies", moviesRouterView);
app.use("/api/v1/movies", moviesRouterAPI);
app.use("/api/v1/users", usersRoutesAPI);

app.get("/", (req, res) => {
  // Ruta al archivo web que quieres enviar
  const filePath = path.join(__dirname, "./views/home.njk");

  // Enviar el archivo como respuesta
  res.render(filePath);
});
app.listen(port, host, () =>
  console.log(`App escoltant en http://${host}:${port}!`)
);
