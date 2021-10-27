const fs = require("fs");

class FileSystemDao{ 
  constructor() {
    this.producto = "";
  }
createProduct(producto){
  const stringProduct = `{
    "name": ${producto.name},
    "description": ${producto.description},
    "code": ${producto.code},
    "thumbnail": ${producto.thumbnail},
    "price": ${producto.price},
    "stock": ${producto.stock}
}`
  
  fs.writeFileSync("./src/db/filesystem/dbtext.txt", stringProduct)
  console.log(`Insertando ${stringProduct} con FileSystem`)
}
readProduct(){
  const data = fs.readFileSync("./src/db/filesystem/dbtext.txt", "utf-8")
  console.log(`Leyendo ${data} con FileSystem`)
}
updateProduct(id, data){
  const stringProduct = `{
    "id": ${id.id},
    "${data}": ${data.data},
}`
  const data = fs.appendFileSync("./src/db/filesystem/dbtext.txt", `Se actualiza el objeto ${stringProduct}`)
  console.log(data)
}
deleteProduct(){
  const data = fs.unlinkSync("./src/db/filesystem/dbtext.txt")
  console.log(data)
}
}

module.exports = new FileSystemDao()