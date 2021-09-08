const express = require('express');
const Productos = require('./productos');

const puerto = 8080;
const app = express();

app.use(express.json());

app.get('/api/productos',(req, res) => {
    res.json(Productos.leerProductos())
})
app.get('/api/productos/:id',(req, res) => {
    res.json(Productos.leerProductosConId(req.params.id))
})
app.post('/api/productos',(req,res) => {
    let prodGuardado = Productos.productoNuevo(req.body)
  	res.send(prodGuardado)
})


const server = app.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});

server.on('error', error => {
    console.log('error en el servidor:', error);
});