const express = require('express');
const router = express.Router();

const jwtMiddleware = require('../middleware/authJwt');
const avatarController = require('../controllers/avatar.controller');

router.get('/', jwtMiddleware.verifyToken, avatarController.getAll);
router.post('/save', jwtMiddleware.verifyToken, avatarController.saveAvatar);

module.exports = router;