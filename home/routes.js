var express = require('express');
var homeController = require('./home.controller');

var router = express.Router();

router.get('/', homeController.index);

module.exports = router;
