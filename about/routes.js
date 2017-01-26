var express = require('express');
var aboutController = require('./about.controller');
var router = express.Router();

router.get('/', aboutController.index);

module.exports = router;
