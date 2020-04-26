const express = require('express');
const fruitController = require('../controllers/fruit-controller');

const router = function () {
    const router = express.Router();
    const bodyParser = require('body-parser');
    router.use(bodyParser.urlencoded({ extended: true }));
    router.use(bodyParser.json()); // support json encoded bodies

    router.post('/order-placing', fruitController.orderPlacing);
    router.get('/report', fruitController.reporting);

    return router;
}

module.exports = router;