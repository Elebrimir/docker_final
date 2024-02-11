"use strict";

const mongoose = require("mongoose");

let commentsSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  nick: {
    type: String,
    required: true,
    minlenght: 3,
    trim: true,
  },
  commentText: {
    type: String,
    required: true,
    minlenght: 2,
  },
});

let movieSchema = new mongoose.Schema(
  {
    id: String,
    title: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      min: 1900,
      max: 2024,
    },
    director: String,
    duration: {
      type: Number,
      min: 1,
    },
    genre: [String],
    rate: {
      type: Number,
      min: 0,
      max: 10,
      default: 5,
    },
    comments: [commentsSchema],
  },
  { versionKey: "__v" }
);

let Movie = mongoose.model("movie", movieSchema);

module.exports = Movie;
