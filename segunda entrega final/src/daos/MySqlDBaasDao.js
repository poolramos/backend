class MySqlDBaasDao{
    constructor(){
        this.producto = "";
    }    
    createProduct(producto){
        console.log(`Insertado ${producto} en MySqlDBaas`)
    }
    readProduct(producto){
        console.log(`Leyendo ${producto} en MySqlDBaas`)
    }
    updateProduct(producto){
        console.log(`Actualizado ${producto} en MySqlDBaas`)
    }
    deleteProduct(producto){
        console.log(`Borrado ${producto} en MySqlDBaas`)
    }
}

module.exports = new MySqlDBaasDao()