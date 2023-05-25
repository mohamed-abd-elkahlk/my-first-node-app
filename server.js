const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

const ApiError = require("./utils/apiError");

dotenv.config({
  path: "config.env",
});
const dbConnection = require("./config/Database");
const categoryRoute = require("./routes/categoriesRoutes");
const glopalError = require("./Middleware/errorMiddleware");

const subCategoryRoute = require("./routes/subCategoreyRoutes");
// database connect
dbConnection();
// express app
const app = express();

// middlewehere
app.use(express.json());

if (process.env.NODE_ENV === "devlopment") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

app.get("/", (req, res) => {
  res.send("app --version 1.0.0");
});
// Mount Routes
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/subcategories", subCategoryRoute);
app.all("*", (req, res, next) => {
  // const err = new Error(`can't find this route ${req.originalUrl}`);
  // next(err.message);
  next(new ApiError(`can't find this route ${req.originalUrl}`, 400));
});

// Global error handling midllwere for express
app.use(glopalError);

const { PORT } = process.env;

const server = app.listen(PORT, () => {
  console.log(`This app run on port ${PORT}`);
});
// handele error out side express
process.on("unhandledRejection", (err) => {
  console.log(`UnhandledRejection ERRORS(${err})`);
  server.close(() => {
    console.error(`shutdown the server.......(:$`);
    process.exit(1);
  });
});
