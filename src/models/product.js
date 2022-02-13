const fs = require('fs');

class ProductSchema {

    constructor(route, format) {
        this.route = route;
        this.format = format;
    };

    //Obtener todo el array de producto
    async getAll(){
        try {
            const res = await fs.promises.readFile(this.route, this.format );  
            return JSON.parse(res);
        } catch (err) {
            console.log(err);
        }
    };

    //Obtener producto del array por idsuccess
    async getById(id){
        try {
            let products = await this.getAll();
            const product = products.find( prod => prod.id === id);
            return product;
        } catch (err) {
            console.warn(err);
        }
    };

    //Agregar un nuevo producto al array con un id que se suma
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
    
    //Actualizar un producto del array por su id
    async update(id, product){
        let products = await this.getAll();
        const updatedProducts = products.map( prod => prod.id === id ?
            {...prod, ...product}
            :
            prod);
        return await fs.promises.writeFile(this.route, JSON.stringify(updatedProducts)); 
    };

    //Eliminar un producto del array por su id
    async deleteById(id){
        try {
            let products = await this.getAll();
            const newProducts = products.filter( prod => prod.id !== id)
            return await fs.promises.writeFile(this.route, JSON.stringify(newProducts)); 
        } catch (err) {
           console.warn(err); 
        }
    };

    //Eliminar todos los productos del array
    async deleteAll(){
        try {
            return await fs.promises.writeFile(this.route, JSON.stringify([]))       
        } catch (err) {
            console.warn(err);
        }
    };

};

const Product = new ProductSchema('./src/products.txt', 'utf-8');

module.exports = Product;
