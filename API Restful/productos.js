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
    
    actualizarConID(id, productoNuevo){
      let idParsed=parseInt(id);   
          let productoAModificar=this.listaProductos.find((obj)=>{
              return obj.id==idParsed;
          });
          if (productoAModificar==undefined){
              return {error:"No existe el producto que desea actualizar"}
          }else{
              productoAModificar.titulo=productoNuevo.title;
              productoAModificar.precio=productoNuevo.price;
              productoAModificar.urlFoto=productoNuevo.thumbnail;
              return productoAModificar;
          }
    }
    
    borrarConID(id){
      let idParsed=parseInt(id);
      let productoABorrar=this.listaProductos.find((obj,idx)=>{
          if(obj.id==idParsed){
              this.listaProductos.splice(idx,1);
              return obj;
          };
      })
      
      if (productoABorrar==[]){
          return {error:"No existe el producto que desea borrar"}
      }
          return productoABorrar;        
    }  
  }
  
  module.exports= new Productos;