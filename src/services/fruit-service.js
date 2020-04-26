const utils = require('../utils');
const acceptedFruits = ["mango", "orange", "banana"];
const FruitDAO = require('../DAO/fruit-dao')

class Service {
    constructor() {
        this.fruitDAO = new FruitDAO();
    }

    reduceFruits(fruits) {
        const keys = Object.keys(fruits);
        const length = keys.length;
        const listFruits = {};

        for (let i = 0; i < length; i++) {
            const key = keys[i];
            if (!acceptedFruits.includes(key))
                continue;
            listFruits[key] = fruits[key];
        }

        return listFruits;
    }

    async orderPlacing(data) {
        const { fruits } = data;
        const listFruits = this.reduceFruits(fruits);

        if (Object.keys(listFruits).length === 0)
            return { error: true, message: "fruits is empty" }

        data.fruits = JSON.stringify(listFruits);
        data.createdUser = 'liendt';

        const result = await this.fruitDAO.createOrder(data);
        const { id } = result;
        if (id <= 0)
            return { error: true, message: "create order error!" }
        return { data: result, message: "create order success!" }
    }

    async report(params) {
        const { from, to } = params;
        const result = await this.fruitDAO.reportOrder()
        let data = result.filter(x => (x.date >= from && x.date <= to));
        data = data.map(item => {
            const { id, fruits, createdAt, updatedAt, ...rest } = item;
            return {
                id: parseInt(id),
                fruits: JSON.parse(fruits),
                createdAt: utils.timeStampToDateTime(createdAt),
                updatedAt: utils.timeStampToDateTime(updatedAt),
                ...rest
            }
        })
        return data;
    }
}

class FruitService {
    constructor() {
        if (!FruitService.instance)
            FruitService.instance = new Service();
    }

    getInstance() {
        return FruitService.instance;
    }
}

module.exports = FruitService;