const express = require('express');

const webServerController = require('./../controllers/webServerController');
const router = express.Router();

router
    .route('/process')
    .get(webServerController.handleRequest)
    .post(webServerController.handleRequest)
    .put(webServerController.handleRequest)
    .delete(webServerController.handleRequest);

module.exports = router;