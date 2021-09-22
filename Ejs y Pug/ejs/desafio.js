const express = require('express');
const Productos = require('./productos');

const puerto = 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static(__dirname + '/public'))
const routerGlobal = express.Router();

app.set('view engine', 'ejs')
app.set('views', './views')

//GET listado 
routerGlobal.get('/',(req, res) => {
  res.render('formulario')
})

//GET listado 
routerGlobal.get('/productos/vista',(req, res) => {
    let arrayProductos = (Productos.leerProductos())
    console.log(arrayProductos)
    if(arrayProductos.error){
      res.render('productos',{hayProductos: false})
  }else{
      res.render('productos',{hayProductos: true, productos:arrayProductos})
  }
})
//GET listado 
routerGlobal.get('/productos',(req, res) => {
    res.json(Productos.leerProductos())
})
//GET producto por ID 
routerGlobal.get('/productos/:id',(req, res) => {
    res.json(Productos.leerProductosConId(req.params.id))
})
//POST de un producto nuevo sin ID
routerGlobal.post('/productos',(req,res) => {
  let prodGuardado = Productos.productoNuevo(req.body)
  res.send("Producto guardado")
  res.send(prodGuardado)
})
//PUT de un producto nuevo con ID
routerGlobal.put('/productos/:id',(req,res) => {
  let prodNuevo = req.body;
  let idProdNuevo = req.params.id
  let prodActualizado = Productos.actualizarConID(idProdNuevo, prodNuevo)
  res.send("Producto actualizado")
  res.send(prodActualizado)
})
//DELETE de un producto con ID
routerGlobal.delete('/productos/:id',(req,res) => {
  let idProdABorrar = req.params.id
  let prodBorrado = Productos.borrarConID(idProdABorrar)
  res.send("Producto eliminado")
  res.send(prodBorrado)
})

// aplico el router global
app.use('/api',routerGlobal)

const server = app.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});

server.on('error', error => {
    console.log('Error en el servidor:', error);
});