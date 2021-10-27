const mongoose = require("mongoose");
const model = require("../models/productos");

const uri = "mongodb://localhost:27017/ecommerce";


class MongoDbLocalDao{
    constructor(){
        this.producto = "";
        }    
        async createProduct(producto){
            try {
                await mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true },err=>{
                    throw new Error(`Error en la conexion de la base de datos ${err}`)
                    console.log(`Base de datos conectada`)
                })
                const crear = await model.insertMany(producto);
                return crear;
            }catch (error)  {
                console.log(`Error: ${error.message}`);
            }finally {
                await mongoose.disconnect();
                console.log("Base de datos desconectada");
            }
        }
        async readProduct(){
            try {
                await mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true },err=>{
                    throw new Error(`Error en la conexion de la base de datos ${err}`)
                    console.log(`Base de datos conectada`)
                })
                const leer = await model.find();
                return leer;
            }catch (error)  {
                console.log(`Error: ${error.message}`);
            }finally {
                await mongoose.disconnect();
                console.log("Base de datos desconectada");
            }
        }
        async updateProduct(producto, id){
            try {
                await mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true },err=>{
                    throw new Error(`Error en la conexion de la base de datos ${err}`)
                    console.log(`Base de datos conectada`)
                })
                const actualizar = await model.updateMany({_id:id}, producto);
                return actualizar;
            }catch (error)  {
                console.log(`Error: ${error.message}`);
            }finally {
                await mongoose.disconnect();
                console.log("Base de datos desconectada");
            }
        }
        async deleteProduct(id){
            try {
                await mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true },err=>{
                    throw new Error(`Error en la conexion de la base de datos ${err}`)
                    console.log(`Base de datos conectada`)
                })
                const borrar = model.deleteOne({_id: id});
                return borrar;
            }catch (error)  {
                console.log(`Error: ${error.message}`);
            }finally {
                await mongoose.disconnect();
                console.log("Base de datos desconectada");
            }
        }
}


module.exports = new MongoDbLocalDao()