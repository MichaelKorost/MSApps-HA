const express = require("express");
const app = express();
const { errorHandler } = require("./middleware/errorMiddleware");

//middleware that parses encoded data content-type: application/x-www-form-urlencoded, submitted by forms
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/photo", require("./routes/photoRoutes"));

// error handler middleware
app.use(errorHandler);

// Ideally port should be in a .env file
const PORT = 4000;
app.listen(PORT, async () => {
  console.log(`listening on port ${PORT}`);
});
