const {options} = require("../db/mysql/mysql.js");
const knex = require("knex")(options);


class MySqlLocalDao{
    constructor(){
        knex.schema.hasTable("products")
        .then(d=>{
            if (!d) {
                knex.schema
                .createTable("products", (table) => {
                    table.increments("id", { primaryKey: true }).notNullable();
                    table.string("name").notNullable();
                    table.string("description").notNullable();
                    table.timestamp("timestamp").defaultTo(knex.fn.now());
                    table.integer("code").notNullable();
                    table.string("picture").notNullable();
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

    async readProduct(id){
        try {
            this.products=[];
            if (id) {
                let product;
                const response = await knex.from("products").select("*").where("id", "=", id);
                for (const row of response) {
                    product = {
                        id: row["id"],
                        timestamp: row["timestamp"],
                        name: row["name"],
                        description: row["description"],
                        code: row["code"],
                        picture: row["picture"],
                        price: row["price"],
                        stock: row["stock"],
                    };
               }
               return product;
            }
           const response = await knex.from("products").select("*");
           for (const row of response) {
                this.products.push({
                    id: row["id"],
                    timestamp: row["timestamp"],
                    name: row["name"],
                    description: row["description"],
                    code: row["code"],
                    picture: row["picture"],
                    price: row["price"],
                    stock: row["stock"],
                });
           }
           return this.products;
        } catch (error) {
            return []
        }    
    }

    async createProduct(product){
        try {
            await knex("products").insert(product);            
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }    
        return product;
    }

    async updateProduct(product, id){        
        try {
            const productUpdate = await this.getProduct(id);
            if (productUpdate == undefined) {
                return [];
            }
            await knex("products")
            .where('id', '=', id)
            .update(data)  
            return await this.getProduct(id);
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }            
    }

    async deleteProduct(id){
        try {
            const response = await this.getProduct();
            const productDelete = response.find(d=>d.id==id);
            if (productDelete == undefined) {
                return [];
            }
            await knex.from("products")
            .where("id", "=", id)
            .del()
            return productDelete;
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }    
    }
}


module.exports = new MySqlLocalDao()