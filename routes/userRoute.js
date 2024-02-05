const express = require('express');
const { registration, login, getUser, logout, loggedIn_controler } = require('../controllers/userController');
const router = express.Router();
const auth = require('../middleware/auth')



// register route

router.post('/register',registration);
router.post('/login',login);
router.get('/user',auth, getUser);
router.post('/logout',logout)
router.get('/isLoggedIn',loggedIn_controler)

module.exports = router