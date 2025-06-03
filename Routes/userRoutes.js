const express = require('express');
const router = express.Router();
const { login, signIn, changePassword } = require('../Controllers/userController');

router.post('/login', login);
router.post('/signIn', signIn);
router.put('/changePassword',changePassword);
module.exports = router;
