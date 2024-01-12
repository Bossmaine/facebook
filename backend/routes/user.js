const express = require('express');
const { register, verifyUserEmail, login } = require('../controllers/user');

const router = express.Router();

router.post('/register', register )
router.post('/verify', verifyUserEmail )
router.post('/login', login )


module.exports = router;