const fs = require('fs');

class MensajetSchema {

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
            let mensajes = await this.getAll();
            const product = mensajes.find( prod => prod.id === id);
            return product;
        } catch (err) {
            console.warn(err);
        }
    };

    //Agregar un nuevo producto al array con un id que se suma
    async save(mensaje){
        try {
            let mensajes = await this.getAll();
            let maxNum = mensajes.length;
            maxNum === 0 ? mensaje.id = 1 : mensaje.id = mensajes[maxNum - 1].id + 1;
            mensajes.push(mensaje);
            await fs.promises.writeFile(this.route, JSON.stringify(mensajes));
        } catch (err) {
            console.warn(err);
        }
    };
    
    //Actualizar un producto del array por su id
    async update(id, mensaje){
        let mensajes = await this.getAll();
        const updatedMessages = mensajes.map( msg => msg.id === id ?
            {...msg, ...mensaje}
            :
            msg);
        return await fs.promises.writeFile(this.route, JSON.stringify(updatedProducts)); 
    };

    //Eliminar un producto del array por su id
    async deleteById(id){
        try {
            let mensajes = await this.getAll();
            const newMessages = mensajes.filter( msg => msg.id !== id)
            return await fs.promises.writeFile(this.route, JSON.stringify(newMessages)); 
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

const Mensaje = new MensajetSchema('./src/mensajes.txt', 'utf-8');

module.exports = Mensaje;