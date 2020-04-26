const express = require('express');
const app = express();
const config = require('./config')
const path = require('path')
const routersPath = path.join(__dirname, "./src/routers");

app.use(require(routersPath)());

app.listen(config.port, function () {
    console.log(`Example app listening on port ${config.port}!`);
});