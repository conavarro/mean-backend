const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require('./routes/posts');

const app = express();

mongoose.set("useNewUrlParser", true);
mongoose
  .connect(
    "mongodb+srv://conra:9NYWG7HUVbY9ZJy@cluster0-pingf.mongodb.net/mean-tutorial?retryWrites=true&w=majority"
  )
  .then(() => console.log("Conexion con mongo exitosa"))
  .catch(() => console.log("Conexion con mongo fallo"));

/**
 * si no se define un path, esos middleware corren para todos los requests
 */

app.use(bodyParser.json());
// parsea el body de todos los requests a JSON para que yo pueda acceder

app.use((req, res, next) => {
  // seteo los header del response para habilitar los requests de otros servidores
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);

module.exports = app;
