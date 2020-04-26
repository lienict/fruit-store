
/**
 * factory design parttern
 */
class Response {
    constructor(options) {
        const { error = false, data = {}, message = '' } = options;
        this.error = error;
        this.data = data;
        this.message = message;
    }

}

function create(options) {
    return new Response(options);
}

module.exports = {
    create
};