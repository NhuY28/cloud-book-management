const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const { engine } = require("express-handlebars");

dotenv.config();

require("./config/database");

const app = express();

const bookRoutes = require("./routes/bookRoutes");
const bookApiRoutes = require("./routes/bookApiRoutes");

const PORT = process.env.PORT || 3000;

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Handlebars
app.engine(
  "handlebars",
  engine({
    defaultLayout: "main",
  })
);

app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// API routes
// Ví dụ: GET /api/books
app.use("/api", bookApiRoutes);

// Web routes
// Ví dụ: GET /books
app.use("/", bookRoutes);

// Trang chủ
app.get("/", (req, res) => {
  res.redirect("/books");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});