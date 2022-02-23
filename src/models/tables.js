const { msql } = require("../config/db");

const products = async () => {
  try {
    const tableExist = await msql.schema.hasTable('products');
    if(tableExist) return console.error('Esta tabla ya existe');
    await msql.schema.createTable('products', table => {
      table.increments('id').primary(),
      table.string('title'),
      table.string('marca'),
      table.string('cat'),
      table.string('desc'),
      table.integer('price'),
      table.integer('stock'),
      table.string('thumbnail')
    })
    console.log("Tabla creada");
  } catch (err) {
    console.warn(err);
  }
}

const messages = async () => {
  try {
    const tableExist = await msql.schema.hasTable('messages');
    if(tableExist) return console.error('Esta tabla ya existe');
    await msql.schema.createTable('messages', table => {
      table.increments('id').primary(),
      table.string('email'),
      table.string('nombre'),
      table.string('msg'),
      table.string('date');
    })
    console.log("Tabla creada");
  } catch (err) {
    console.warn(err);
  }
}


module.exports = {
  products,
  messages
}
