//imports
const express = require("express")
const fs = require("fs")

const app = express()
const port = 8080

//lectura texto
let data = fs.readFileSync('./productos.txt', 'utf-8')
let productos = JSON.parse(data)
let productosTotal = JSON.parse(data)

// 1- listado de nombres de producto
let listadoNombres = []
let arrayProductos = () => {
    productosTotal.forEach(e => {
        listadoNombres.push(e.title) 
    });
    productosTotal = []
    return listadoNombres
}

// 2- Randomizar producto elegido
let numeroRandom = () => {
    let numero = Math.floor(Math.random() * (productos.length))
    return numero
};

// 3- Contador de visitas

let contador1 = 0
let contador2 = 0


//ruta items
app.get('/items',(req, res) => {  
    contador1++
    let respuesta =`
        <html>
            <body>
                <h1>Desafio EXPRESS - Santiago Homps</h1>
                <h5>Consigna 1</h5>
                <p>
                {items: ${arrayProductos()}, cantidad: ${productos.length}}
                </p>
            </body>
        </html>
        `
    res.send(respuesta)
})

//ruta item random
app.get('/item-random',(req, res) => {
    contador2++
    let respuesta =`
        <html>
            <body>
                <h1>Desafio EXPRESS - Santiago Homps</h1>
                <h5>Consigna 2</h5>
                <p>
                {item: ${JSON.stringify(productos[numeroRandom()])}}
                </p>
            </body>
        </html>
        `
        res.send(respuesta)
    })  

// ruta visitas
app.get('/visitas',(req, res) => {
    let respuesta =`
<html>
    <body>
        <h1>Desafio EXPRESS - Santiago Homps</h1>
        <h5>Consigna 3</h5>
        <p>
        {
            visitas:
            {item1: ${contador1}}
            {item2: ${contador2}}
        }
        </p>
    </body>
</html>
`
        res.send(respuesta)
    })

// servidor
app.listen(port, () => console.log(`server at http://localhost:${port}`))