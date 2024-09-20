const express = require("express");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require('body-parser')
const cors = require('cors');



app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static("public"));

const placeRoute = require("./route/place");
const elementRoute = require("./route/element");


app.use("/place", placeRoute);
app.use("/element", elementRoute);





const uri = "mongodb+srv://ironwood:ironwood@cluster0.gjqyu.mongodb.net/ironwood";
const PORT = process.env.PORT || 8080;
let connection = mongoose.connect(uri);

connection
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection established");

      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("connection failed", err);
  });