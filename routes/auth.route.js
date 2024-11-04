const express = require('express');
const router= express.Router();

const authController = require('../controllers/auth.controller');

router.post('/signup', authController.addNewUser);

router.post('/login', authController.loginUser);

module.exports = router;