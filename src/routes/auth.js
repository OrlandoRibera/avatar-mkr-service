const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');

/* GET users listing. */
router.post('/signUp', authController.signUp);
router.post('/signIn', authController.signIn);

module.exports = router;
