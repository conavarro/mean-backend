const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const routes = express.Router();

/**
 * 'then' es para manejar la respuesta en caso de tenerla sin que haya un error
 * (no encontrar lo que estoy buscando no es un error)
 */
routes.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });
    user
      .save()
      .then(result => {
        // result es el usuario creado
        res.status(201).json({
          message: "CREATED_USER",
          extraData: result
        });
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  });
});

routes.post("/login", (req, res, next) => {
  let aux_user;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          mensaje: "EMAIL_NOT_FOUND"
        });
      }
      aux_user = user;
      bcrypt.compare(req.body.password, user.password).then(result => {
        if (!result) {
          return res.status(401).json({
            mensaje: "INVALID_PASSWORD"
          });
        }
        const token = jwt.sign(
          { email: aux_user.email, userId: aux_user._id },
          "clave_secreta",
          { expiresIn: "1h" }
        );
        res.status(200).json({ token: token });
      });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

module.exports = routes;
