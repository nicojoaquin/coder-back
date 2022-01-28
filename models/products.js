const fs = require('fs');

class Container {

    constructor(route, format) {
        this.route = route;
        this.format = format;
    };

    async getAll(){
        try {
            const res = await fs.promises.readFile(this.route, this.format );   
            return JSON.parse(res);
        } catch (err) {
            console.log(err);
        }
    };

    async getById(id){
        try {
            let products = await this.getAll();
            const product = products.find( prod => prod.id === id);
            return product;
        } catch (err) {
            console.warn(err);
        }
    };

    async save(product){
        try {
            let products = await this.getAll();
            let maxNum = products.length;
            maxNum === 0 ? product.id = 1 : product.id = products[maxNum - 1].id + 1;
            products.push(product);
            await fs.promises.writeFile(this.route, JSON.stringify(products));
        } catch (err) {
            console.warn(err);
        }
    };
    
    async update(id, product){
        let products = await this.getAll();
        const updatedProducts = products.map( prod => prod.id === id ?
            {...prod, ...product}
            :
            prod);
        return await fs.promises.writeFile(this.route, JSON.stringify(updatedProducts)); 
    };

    async deleteById(id){
        try {
            let products = await this.getAll();
            const newProducts = products.filter( prod => prod.id !== id)
            return await fs.promises.writeFile(this.route, JSON.stringify(newProducts)); 
        } catch (err) {
           console.warn(err); 
        }
    };

    async deleteAll(){
        try {
            return await fs.promises.writeFile(this.route, JSON.stringify([]))       
        } catch (err) {
            console.warn(err);
        }
    };

};

const products = new Container('./products.txt', 'utf-8');
// products.save({title: "Campera", price: 14000, thumbnail: "imagencampera.jpg"});
// products.getById(2)
// products.deleteById(3);
// products.deleteAll()

module.exports = products;
