class Product {

    static #list = [];

    constructor(name, price, description) {


        this.name = name;
        this.price = price;
        this.description = description;

        this.id = Math.floor(10000 + Math.random() * 9000);
        this.createDate = new Date().toISOString();
    }


    static add = (product) => {
        this.#list.push(product);
    }

    static getList = () => {

        return this.#list;
    }


    static getById = (id) => {
        return this.#list.find((product) => product.id === id);
    }

    static updById = (id, data) => {
        const product = this.getById(id);
        if (product) {
            if (data.name) product.name = data.name;
            if (data.price) product.price = data.price;
            if (data.description) product.description = data.description;
            return true;
        } else {
            return false;
        }
    }

    static deleteById = (id) => {
        const index = this.#list.findIndex((product) => product.id === id);

        if (index !== -1) {
            this.#list.splice(index, 1);
            return true;
        } else {
            return false;
        }
    }

}

module.exports = Product;