let toursArray = [];

module.exports = class Tour {
    constructor(name, description, price){
        this.name = name;
        this.description = description;
        this.price = price;
    }
    save() {
        tousArray.push(this);
    }
    static getAll() {
        return toursArray;
    }
}