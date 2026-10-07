const mongoose = require("mongoose");
const { readConnection, writeConnection } = require("../config/database");

const bookSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    author: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    vat: {
      type: Number,
      required: true,
    },

    finalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ReadBook = readConnection.model("Book", bookSchema, "books");
const WriteBook = writeConnection.model("Book", bookSchema, "books");

module.exports = {
  ReadBook,
  WriteBook,
};