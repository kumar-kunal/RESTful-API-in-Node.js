const express = require('express');
const router = express.Router();


const UserController = require('../controllers/user');
const checkAuth = require('../middlewares/check-auth')


router.post('/login', UserController.user_singin);

router.post('/nearby',checkAuth, UserController.user_nearby);

router.get('/finder',checkAuth, UserController.user_finder);

module.exports = router;