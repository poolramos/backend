const express = require("express");
const handlebars = require("express-handlebars");
const methodOverride = require('method-override');
const mongoose = require("mongoose");
const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/userRouter");
const util = require('util');
const cookieParser = require('cookie-parser');

function print(obj) {
    console.log(util.inspect(obj, false, 12, true));
}

const Message = require("./db/Message");
const Product = require("./db//Product");

//Normalizr
const normalizr = require('normalizr');
const normalize = normalizr.normalize;
const denormalize = normalizr.denormalize;
const schema = normalizr.schema;

const author = new schema.Entity('authors', {}, { idAttribute: 'email' })
const text = new schema.Entity('texts', {
    author: author
}, { idAttribute: '_id' })

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const routerAPI = express.Router();
const PORT = 8080; //

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static("./public"));
app.use(cookieParser());
app.use("/api", routerAPI);
app.use("/productos", productRouter);
app.use("/user", userRouter);
server.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
server.on("error", (error) => console.log("Server Error\n\t", error));


// handlebars engine
app.engine("hbs", handlebars({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views",
    partialsDir: __dirname + "/views/partials"
}));
app.set("views", "./views");
app.set("view engine", "hbs");
app.get('/', (_, res) => res.redirect('/productos'));

//Mongoose
connect()

function connect() {
    const URI = 'mongodb://localhost:27017/ecommerce-test';
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 1000
    })
        .then(() => console.log('Conectado a la base de datos...'))
        .catch(error => console.log('Error al conectarse a la base de datos', error));
}

io.on('connection', (socket) => {
    console.log('Someone is connected');

    //funcion para leer todos los mensajes de la db y mostrarlos.
    function selectAllMessages() {
        Message.find().sort({ 'date': -1 })
            .then(messages => {
                const parsedMessages = messages.map(function (m) {
                    return {
                        _id: m._id.toString(),
                        author: {
                            email: m.author.email,
                            name: m.author.name,
                            lastName: m.author.lastName,
                            age: m.author.age,
                            alias: m.author.alias,
                            avatar: m.author.avatar
                        },
                        text: m.text,
                        timeStamp: m.timeStamp
                    };
                })
                const normalizedMsgs = normalize(parsedMessages, [text]);
                //print(normalizedMsgs);
                console.log('Longitud antes de normalizar:', JSON.stringify(messages).length);
                console.log('Longitud después de normalizar:', JSON.stringify(normalizedMsgs).length);
                socket.emit('messages', { messages: messages, normalizedMsgs: normalizedMsgs, });
            })
            .catch(e => {
                console.log('Error getting messages: ', e);
            });
    }

    //Llamo a la funcion para que se muestren los mensajes al levantar el servidor.
    selectAllMessages();

    Product.find().sort({ '_id': 1 })
        .then(products => {
            socket.emit('productCatalog', { products: products, updateForm: false, viewTitle: "Listado de productos", errorMessage: "No hay productos." });
        })
        .catch(e => {
            console.log('Error getting products: ', e);
        });

    //Inserto un nuevo mensaje en la base de datos de mensajes.
    socket.on('newMsg', newMsg => {
        Message.create(newMsg)
            .then(() => {
                console.log('Mensaje insertado');
                selectAllMessages();
                return false;
            })
            .catch(e => {
                console.log('Error en Insert message: ', e);
            });
    });
});