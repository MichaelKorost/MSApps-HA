const express = require("express");
const app = express();

//middleware that parses encoded data content-type: application/x-www-form-urlencoded, submitted by forms
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use("/api/photo", require("./routes/photo"));

// Ideally port should be in a .env file
const PORT = 4000;
app.listen(PORT, async () => {
  console.log(`listening on port ${PORT}`);
});
