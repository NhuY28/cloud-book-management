const express = require("express");
const { ReadBook, WriteBook } = require("../models/book");

const router = express.Router();

const MSSV_PREFIX = "326";
const VAT = 4;

// GET /books
router.get("/books", async (req, res) => {
  try {
    const books = await ReadBook.find()
      .sort({ createdAt: -1 })
      .lean();

    res.render("books", {
      books,
      vat: VAT,
    });
  } catch (error) {
    console.error("Render books error:", error.message);

    res.status(500).send(
      "Không thể hiển thị danh sách sách"
    );
  }
});

// POST /books
router.post("/books", async (req, res) => {
  try {
    const { code, title, author, price } = req.body;

    if (!code || !code.startsWith(MSSV_PREFIX)) {
      return res.status(400).send(
        "Mã sách phải bắt đầu bằng 326"
      );
    }

    const originalPrice = Number(price);

    if (isNaN(originalPrice) || originalPrice < 0) {
      return res.status(400).send(
        "Giá sách không hợp lệ"
      );
    }

    const finalPrice = Math.round(
      originalPrice * (1 + VAT / 100)
    );

    await WriteBook.create({
      code,
      title,
      author,
      price: originalPrice,
      vat: VAT,
      finalPrice,
    });

    res.redirect("/books");
  } catch (error) {
    console.error("WRITE web book error:", error.message);

    res.status(500).send(
      "Không thể thêm sách"
    );
  }
});

module.exports = router;