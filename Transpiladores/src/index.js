//importo express
var express = require('express');
// instancias
var puerto = 8080;
var app = express();
var productos = [{
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
    }];
//GET listado 
app.get('/', function (req, res) {
    var html = productos.map(function (elem) {
        return ("\n            <ul>\n                <li>ID: " + elem.id + "</li>\n                <li>Nombre: " + elem.title + "</li>\n                <li>Precio: " + elem.price + "</li>\n            </ul>\n        ");
    }).join(" ");
    res.send(html);
});
var server = app.listen(puerto, function () {
    console.log("servidor escuchando en http://localhost:" + puerto);
});
