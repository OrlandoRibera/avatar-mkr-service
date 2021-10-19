const express = require('express');
const jwtMiddleware = require('../middleware/authJwt');
const {commonResponse} = require("../controllers/basic.controller");
const router = express.Router();

/* GET home page. */
router.get('/', jwtMiddleware.verifyToken, function (req, res) {
    return commonResponse(req, res, 200, 'Rest Api works');
});

module.exports = router;
