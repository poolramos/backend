// import file system 
// const fs = require("fs")


class Archivo {

    fs = require("fs")

    constructor(file) {
        this.file = file
        this.codif = "utf-8"
    }

    async guardar(productoNuevo) {
            const data = await this.leer()
            productoNuevo.id = data.length + 1;
            data.push(productoNuevo)
            try {
                await this.fs.promises.writeFile(this.file, JSON.stringify(data, null, "\t"));
                
            } catch (error) {
                console.log('el archivo no se pudo guardar', error)
            }
           
    }

    async leer(){
        try {
            let data = await this.fs.promises.readFile(`./${this.file}`, this.codif)
            return JSON.parse(data)
        } catch {
            console.log("archivo vacio")
            return []
        }
    }

    async borrar() {
        try {
            await this.fs.promises.unlink(`./${this.file}`)
        } catch (error) {
            console.log("no se pudo borrar el archivo", error)
        }
    }

}

//para crear un producto
class Producto {
    constructor(title, price, thumbnail) {
        this.title = title,
        this.price = price,
        this.thumbnail = thumbnail
    }
}


const prueba = async () => {

    const itemNuevo1 = new Producto('Cortina', 135.51, 'url1')
    const itemNuevo2 = new Producto('Pizarra', 567.24, 'url2')
    
    const rutaArchivo = new Archivo('productos.txt')

    await rutaArchivo.guardar(itemNuevo1)
    await rutaArchivo.guardar(itemNuevo2)

    // await rutaArchivo.borrar()

}

prueba()
