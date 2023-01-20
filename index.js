
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

const postRoute = require("./routes/posts");

dotenv.config();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Connecting to MongoDB
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.mongo_URL)
  .then(console.log("Connected to MongoDB"))
  .catch((err) => {
    console.log(err);
  });

app.use("/posts", postRoute);

app.get("/", (req, res) => {
  res.send("API is working");
});


app.listen(process.env.PORT || 5000, () => {
  console.log("Backend is up and running....");
});

