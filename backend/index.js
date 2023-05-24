const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const { cors } = require("./middleware/corsMiddleware");

//middleware that parses encoded data content-type: application/x-www-form-urlencoded, submitted by forms
app.use(cors);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/photo", require("./routes/photoRoutes"));

// error handler middleware
app.use(errorHandler);

const { PORT } = process.env;

app.listen(PORT, async () => {
  console.log(`listening on port ${PORT}`);
});
