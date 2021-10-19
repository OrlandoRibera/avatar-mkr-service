const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const {commonResponse} = require("../controllers/basic.controller");

verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];

    if (!token) {
        return commonResponse(req, res, 403, 'Token no encontrado en los headers');
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) return commonResponse(req, res, 401, 'Token no autorizado');

        req.userId = decoded.userId;
        next();
    })
};

const authJwt = {
    verifyToken
};

module.exports = authJwt;