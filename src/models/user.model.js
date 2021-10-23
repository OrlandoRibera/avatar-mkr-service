const mongoose = require("mongoose");
const { Username } = require("../utils/validators");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    validate: [Username, "Username inválido"],
    required: "Username es requerido",
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: "Email es requerido",
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: "Password es requerido",
    trim: true,
    minlength: [6, 'Password debe ser mayor a 6 caracteres'],
    match: [
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/,
      "El password debe contener al menos un caracter especial, un número y una letra mayúscula",
    ],
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
