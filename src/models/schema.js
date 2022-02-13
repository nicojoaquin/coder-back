const fs = require('fs');

class Schema {

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
            let items = await this.getAll();
            const item = items.find( it => it.id === id);
            return item;
        } catch (err) {
            console.warn(err);
        }
    };

    //Agregar un nuevo producto al array con un id que se suma
    async save(item){
        try {
            let items = await this.getAll();
            let maxNum = items.length;
            maxNum === 0 ? item.id = 1 : item.id = items[maxNum - 1].id + 1;
            items.push(item);
            await fs.promises.writeFile(this.route, JSON.stringify(items));
        } catch (err) {
            console.warn(err);
        }
    };
    
    //Actualizar un producto del array por su id
    async update(id, item){
        let items = await this.getAll();
        const updatedItems = items.map( it => it.id === id ?
            {...it, ...item}
            :
            it);
        return await fs.promises.writeFile(this.route, JSON.stringify(updatedItems)); 
    };

    //Eliminar un producto del array por su id
    async deleteById(id){
        try {
            let items = await this.getAll();
            const updatedItems = items.filter( it => it.id !== id)
            return await fs.promises.writeFile(this.route, JSON.stringify(updatedItems)); 
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

const Product = new Schema('./src/products.txt', 'utf-8');
const Mensaje = new Schema('./src/mensajes.txt', 'utf-8');

module.exports = {
  Product,
  Mensaje
};
