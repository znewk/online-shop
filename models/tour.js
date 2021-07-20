let toursArray = [];

module.exports = class Tour {
    constructor(name, price, data){
        this.name = name;
        this.price = price;
        this.data = data
    }
    save() {
        tousArray.push(this);
    }
    static getAll() {
        return toursArray;
    }
}