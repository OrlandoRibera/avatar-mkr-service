const jwt = require('jsonwebtoken');
const db = require('../models');
const Avatar = db.avatar;
const User = db.user;
const { commonResponse } = require('./basic.controller');

exports.getAll = async (req, res, next) => {
    const avatars = await Avatar.find().populate({
        path: '_creator',
        select: '-password',
    });
    return commonResponse(req, res, 200, '', avatars);
};

exports.saveAvatar = async (req, res, next) => {
    const options = req.body;
    const userId = req.userId;

    if (!userId) return commonResponse(req, res, 404, 'No se encontró el user id en la petición');

    const user = await User.findById(userId).select(['-password']);

    const avatar = new Avatar({
        _creator: user,
        options
    });

    avatar
        .save()
        .then((registered) => {
            return commonResponse(
                req,
                res,
                200,
                "¡Registro exitoso!",
                registered
            );
        })
        .catch((error) => {
            return commonResponse(req, res, 500, error.errors.message);
        });
};