const express = require('express');
const blog = require('./blog');
const user = require('./user');
const router = express.Router();
router.use('/user', user);
router.use('/blog', blog);

module.exports = router;