const axios = require('axios');

class FruitDAO {
    constructor() {
        this.API = 'http://5ea58fc62d86f00016b45f2d.mockapi.io/v1/fruit-order';
    }

    async reportOrder() {
        let response = [];
        try {
            const result = await axios.get(this.API);
            response = result.data;
        } catch (ex) {
            console.log(ex);
        }

        return response;
    }

    async createOrder(data) {
        let response = { id: -1 };;
        try {
            const time = new Date().getTime();
            response = await axios.post(this.API, {
                "createdAt": time,
                "updatedAt": time,
                ...data
            });
            return response.data
        } catch (ex) {
            console.log(ex);
        }
        return response;
    }
}

module.exports = FruitDAO;