const express = require('express');
const { signin, signup, updateUser } = require('../controller/user.js');
const auth = require('../middleware/auth.js');
const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.patch('/update/:id', auth, updateUser);

module.exports = router;
