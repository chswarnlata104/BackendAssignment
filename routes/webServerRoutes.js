const express = require('express');

const webServerController = require('./../controllers/webServerController');
const router = express.Router();

router
    .route('/')
    .get(webServerController.getAllResponse);

module.exports = router;