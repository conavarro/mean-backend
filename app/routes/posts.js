const express = require("express");

const Post = require("../models/post");

const routes = express.Router();

routes.get("", (req, res, next) => {
  Post.find().then(response => {
    res.status(200).json(response);
  });
});

routes.post("", (req, res, next) => {
  const post = new Post({
    nombre: req.body.nombre,
    contenido: req.body.contenido,
    detalle: req.body.detalle
  });
  post.save().then(response => {
    res.status(201).json({
      mensaje: "Post agregado",
      createdPostid: response._id
    });
  });
});

routes.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then(result => {
    res.status(200).json(result);
  });
});

routes.delete("/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then(() => {
    res.status(200).json({ mensaje: "Post eliminado" });
  });
});

routes.put("/:id", (req, res, next) => {
  const post = new Post({
    _id: req.params.id,
    nombre: req.body.nombre,
    contenido: req.body.contenido,
    detalle: req.body.detalle
  });
  Post.updateOne({ _id: req.params.id }, post)
    .then(result => {
      console.log(result);
      res.status(418).json({ mensaje: "Post modificado" });
    })
    .catch(err => console.log(err));
});

module.exports = routes;
