const express = require('express');
const app = express();
const Handlebars = require("express-handlebars");
const Productos = require('./productos');

const http = require('http');
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)



const puerto = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/', express.static(__dirname + '/views'))
app.use(express.static(__dirname + '/public'));

const routerGlobal = express.Router();

//HANDLEBARS

app.engine('.hbs',Handlebars({                        //func. de config.
        extname: '.hbs',                              //extension a utilizar
        defaultLayout: 'index.hbs',                   //plantilla ppal 
        layoutsDir: __dirname + '/views/layouts',     //ruta a la plantilla ppal
        partialsDir: __dirname + '/views/partials'    // ruta a las plant parciales
    })
)

// se setea el motor de plantilla a utilizar
app.set('view engine', 'hbs')
// directorio de archivos de plantilla
app.set('views', './views')

const productos = [
    // {Titulo: "title", Precio:" price", IMG: ".thumbnail"},
    // {Titulo: "title", Precio:" price", IMG: ".thumbnail"},
    // {Titulo: "title", Precio:" price", IMG: ".thumbnail"}
]

//socket

io.on('connection', socket => {
    console.log('usuario conectado');

    socket.emit('productos', productos);
    
    socket.on('productoNuevo', data => {
 
        productos.push({title: data.title, price: data.price, thumbnail: data.thumbnail})
        io.sockets.emit('productos', productos);

    })


});


//GET y render
routerGlobal.get('/productos/vista',(req,res)=>{
    let arrayProductos=Productos.leerProductos();
    if(arrayProductos.error){
        res.render('main',{hayProductos: false})
    }else{
        res.render('main',{hayProductos: true, productos:arrayProductos})
    }
})
//GET y render
routerGlobal.get('/',(req,res)=>{
        res.render('./partials/formulario')
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

server.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});

server.on('error', error => {
    console.log('Error en el servidor:', error);
});