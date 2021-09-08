class Productos {
    listaProductos = []
        idNuevo = 0
    
    //METODOS
 
    productoNuevo(producto){
      this.listaProductos.push({
        id:++this.idNuevo, //incremento el id inicial y lo asigno al producto nuevo
        title: producto.title,
        price: producto.price,
        thumbnail: producto.thumbnail
      })
      return(this.listaProductos[this.id-1]); //retorno el producto creado como objeto
    }
    leerProductos(){
      if (this.listaProductos.length<=0) {
        return {error:"Aun no existe ningun producto"}
      } else {
        return this.listaProductos
      }
    }
    leerProductosConId(id){
      if (this.listaProductos[id-1]==undefined) {
        return {error:"Ese producto no existe aun"}
      } else {
        return this.listaProductos[id-1]
      }    
    }
  }

module.exports= new Productos;