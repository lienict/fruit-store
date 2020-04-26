const clientResponse = require('../models/http-response');
const FruitService = require('../services/fruit-service');
const fruitService = new FruitService().getInstance();

async function orderPlacing(req, res) {
    let { body: { date = 0, fruits = {} } } = req;

    try {
        if (!date || !fruits || Object.keys(fruits).length === 0)
            return res.json(clientResponse.create({ error: true, message: "date or fruits is missing" }))
        date = parseInt(date);
        if (!date || date <= 0)
            return res.json(clientResponse.create({ error: true, message: "date is null or less then zero!" }))

        // save fruit to DB
        const result = await fruitService.orderPlacing({ date, fruits });

        return res.json(clientResponse.create(result))
    } catch (error) {
        console.log(error);
    }

    return res.json(clientResponse.create({ error: true, message: "exception" }))
}

async function reporting(req, res) {
    let { query: { from, to } } = req;
    if (!from || !to)
        return res.json(clientResponse.create({ error: true, message: "from or to is missing" }))
    try {

        from = parseInt(from);
        to = parseInt(to);
        if (from <= 0 || to <= 0)
            return res.json(clientResponse.create({ error: true, message: "from or to less then zero" }))

        const result = await fruitService.report({ from, to });
        return res.json(clientResponse.create({ data: result }))

    } catch (ex) {
        console.log(ex);
    }
    return res.json(clientResponse.create({ error: true, message: "exception" }))
}

module.exports = {
    orderPlacing,
    reporting
}