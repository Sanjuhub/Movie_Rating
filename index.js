const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const keys = require("./config/keys");
require("./models/movies");

mongoose.connect(keys.mongoURI);

mongoose.connection
  .once("open", () => console.log("Sucessfully connected to the database....."))
  .on("error", (error) => {
    console.warn("Warning****", error);
  });

const app = express();

app.use(bodyParser.json());

require("./routes/ratingRoutes")(app);

const PORT = 5000;
app.listen(PORT);
