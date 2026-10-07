const express = require("express");
const { ReadBook, WriteBook } = require("../models/book");

const router = express.Router();

const MSSV_PREFIX = "326";
const VAT = 4;

router.get("/books", async (req, res) => {
  try {
    const books = await ReadBook.find().sort({ createdAt: -1 });

    res.json(books);
  } catch (error) {
    console.error("READ books error:", error.message);

    res.status(500).json({
      message: "Không thể lấy danh sách sách",
    });
  }
});


router.post("/books", async (req, res) => {
  try {
    const { code, title, author, price } = req.body;

    // Kiểm tra mã sản phẩm
    if (!code || !code.startsWith(MSSV_PREFIX)) {
      return res.status(400).json({
        message: "Mã sản phẩm phải bắt đầu bằng 326",
      });
    }

    const originalPrice = Number(price);

    if (isNaN(originalPrice) || originalPrice < 0) {
      return res.status(400).json({
        message: "Giá sản phẩm không hợp lệ",
      });
    }

    const finalPrice = Math.round(
      originalPrice * (1 + VAT / 100)
    );

    const book = await WriteBook.create({
      code,
      title,
      author,
      price: originalPrice,
      vat: VAT,
      finalPrice,
    });

    res.status(201).json(book);
  } catch (error) {
    console.error("WRITE book error:", error.message);

    res.status(500).json({
      message: "Không thể thêm sách",
    });
  }
});

module.exports = router;