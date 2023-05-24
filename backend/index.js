const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const { cors } = require("./middleware/corsMiddleware");

// Middleware that handles Cross-Origin Resource Sharing (CORS)
app.use(cors);

// Middleware that parses JSON data
app.use(express.json());

// Middleware that parses URL-encoded data submitted by forms
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/photo", require("./routes/photoRoutes"));

// Error handler middleware
app.use(errorHandler);

const { PORT } = process.env;

app.listen(PORT, async () => {
  console.log(`listening on port ${PORT}`);
});
