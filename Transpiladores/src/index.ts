//importo express
const express = require('express');

// instancias
const puerto = 8080;
const app = express();

const productos = [{
    "id": 1,
    "title": "Bread - Multigrain",
    "price": 47
  }, {
    "id": 2,
    "title": "Turnip - White",
    "price": 94
  }, {
    "id": 3,
    "title": "Soup Knorr Chili With Beans",
    "price": 67
  }, {
    "id": 4,
    "title": "Juice - Lime",
    "price": 21
  }, {
    "id": 5,
    "title": "Salt - Celery",
    "price": 67
  }]

//GET listado 
app.get('/',(req:any, res:any) => {

    let html = productos.map(elem => {
        return (`
            <ul>
                <li>ID: ${elem.id}</li>
                <li>Nombre: ${elem.title}</li>
                <li>Precio: ${elem.price}</li>
            </ul>
        `)
    }).join(" ");

    res.send(html)
})

const server = app.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});




