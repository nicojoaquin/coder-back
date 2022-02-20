const { knex } = require("../config/db");

const table = async () => {
  try {
    const tableExist = await knex.schema.hasTable('products');
    if(tableExist) return console.error('Esta tabla ya existe');
    await knex.schema.createTable('products', table => {
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

module.exports = {
  table
}
