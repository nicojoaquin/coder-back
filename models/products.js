const fs = require('fs');

class Container {
    constructor(route, format) {
        this.route = route;
        this.format = format;
    }
    async getAll(){
        try {
            const res = await fs.promises.readFile(this.route, this.format );   
            return JSON.parse(res);
        } catch (err) {
            console.log(err);
        }
    }
    async save(product){
        try {
            let contenedor = await this.getAll();
            let max = contenedor.length;
            max === 0 ? product.id = 1 : product.id = contenedor[max - 1].id + 1;
            contenedor.push(product);
            const productsJson = JSON.stringify(contenedor);
            await fs.promises.writeFile(this.route, productsJson);
        } catch (err) {
            console.warn(err);
        }
    }
    async getById(id){
        try {
            let contenedor = await this.getAll();
            const product = contenedor.find( prod => prod.id === id);
            return product;
        } catch (err) {
            console.warn(err);
        }

    }
    async deleteById(id){
        try {
            let contenedor = await this.getAll();
            const newContainer = contenedor.filter( prod => prod.id !== id)
            const productsJson = JSON.stringify(newContainer);
            return await fs.promises.writeFile(this.route, productsJson); 
        } catch (err) {
           console.warn(err); 
        }

    }
    async deleteAll(){
        try {
            return await fs.promises.writeFile(this.route, JSON.stringify([]))       
        } catch (err) {
            console.warn(err);
        }
    }
}

const products = new Container('./products.txt', 'utf-8');
// products.save({title: "Campera", price: 14000, thumbnail: "imagencampera.jpg"});
// products.getById(2)
// products.deleteById(3);
// products.deleteAll()

module.exports = products;
