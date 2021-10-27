const {options} = require("../db/sqlite3/options/sqlite3");
const knex = require("knex")(options);

class SQLiteDao{ 
  constructor(){
    knex.schema.hasTable("productos")
    .then(d=>{
        if (!d) {
            knex.schema
            .createTable("productos", (table) => {
                table.increments("id", { primaryKey: true }).notNullable();
                table.string("name").notNullable();
                table.string("description").notNullable();
                table.timestamp("timestamp").defaultTo(knex.fn.now());
                table.integer("code").notNullable();
                table.string("thumnail").notNullable();
                table.float("price").notNullable();
                table.integer("stock").notNullable();
            })
            .then(() => console.log("table created"))
            .catch((error) => {
                console.log(error);
                return {manssage:"Error al crear la base de datos.", err:error}
            })
            .finally(() => {
                knex.destroy();
            });
        }
    })
    .catch(err=>console.log(err)) 
}
createProduct(producto){
    knex('productos').insert(producto)
    .then(()=> console.log(`Insertado ${producto} en SQLite`))
    .catch((err)=> { console.log(err); throw err})
    .finally(()=> {
      knex.destroy()
    })
}
readProduct(){
    knex.from('productos').select('*')
    .then((rows)=>{
      for(row of rows){
        console.log(`${row["id"]} ${row["name"]} ${row["price"]}`)
      }
    }).catch((err) => {console.log(err); throw err})
    .finally(()=>{
      knex.destroy();
    })

}
updateProduct(data, id){
    knex.from('productos').where('id', '*', id).update(data)
    .then(()=> console.log (`update`))
    .catch((err)=> {console.log(err); throw err})
    .finally(()=>{
      knex.destroy();
    })
}
deleteProduct(id){
  knex.from('productos').where('id', '=', id).del()
  .then(()=> console.log (`delete`))
  .catch((err)=> {console.log(err); throw err})
  .finally(()=>{
    knex.destroy();
  })
}
}

module.exports = new SQLiteDao()