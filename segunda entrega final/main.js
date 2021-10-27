const DaoFactory = require("./src/daoFactory")

//////////////////

const FileSystem = 1 
const MySQLlocal = 2
const MySQLDBaaS = 3
const SQLite3 = 4 
const MongoDBLocal = 5
const MongoDBDBaaS = 6
const Firebase = 7

//////////////////

const OPCION = MongoDBDBaaS
const crearProducto = {
    "name": "Guitarra",
    "description": "Guitarra electrica Gibson",
    "code": 248,
    "thumbnail": "gibson.jpg",
    "price": 300,
    "stock": 10
}
const actualizarPrecioProducto = {price: 450}
const id = {id: 1} 

//////////////////

const daofactory = DaoFactory.getDao(OPCION);

daofactory.createProduct(crearProducto)
//daofactory.readProduct()
//daofactory.updateProduct(id, actualizarPrecioProducto)
//daofactory.deleteProduct()
