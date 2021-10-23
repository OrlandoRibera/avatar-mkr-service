const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const { commonResponse } = require("./basic.controller");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

/**
 * Sign up function that insert a new user to database
 * @param req
 * @param res
 * @return {*}
 */
exports.signUp = (req, res) => {
  const { username, email, password } = req.body;
  if (username && email && password) {
    const user = new User({
      username: username,
      email: email,
      password: password,
    });

    // Validate password
    user.validateSync();
    // If password is valid, encrypt
    // user.set({ password: bcrypt.hashSync(password, 8) });

    user
      .save()
      .then((registered) => {
        return commonResponse(
          req,
          res,
          200,
          "¡Registro exitoso!",
          registered.id
        );
      })
      .catch((error) => {
        return commonResponse(req, res, 500, error.errors.password.message);
      });
  } else {
    return commonResponse(
      req,
      res,
      400,
      "Username, email y password son requeridos"
    );
  }
};

/**
 * Sign in function, verifies if the user exists, if the password correspond to the user and creates a new jwt to return
 * in the response
 * @param req
 * @param res
 * @return {*}
 */
exports.signIn = (req, res) => {
  User.findOne({ username: req.body.username }).exec((error, user) => {
    if (error) return commonResponse(req, res, 500, error.message);
    if (!user) {
      return commonResponse(req, res, 404, "Usuario y/o contraseña inválidos");
    }

    // const passwordValid = bcrypt.compareSync(req.body.password, user.password);
    const passwordValid = req.body.password === user.password;

    if (!passwordValid) {
      return commonResponse(req, res, 404, "Usuario y/o contraseña inválidos");
    }
    const token = jwt.sign({ userId: user.id }, config.secret, {
      expiresIn: 180, // 3 minutes
    });

    return commonResponse(req, res, 200, "Inicio de sesión exitoso", {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  });
};
