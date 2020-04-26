const app = require('express');

module.exports = function () {
    const router = app.Router();
    
    // USER
    let userRouter = require('./fruit-router')();
    router.use('/fruit-store', userRouter);
    
    return router
};
