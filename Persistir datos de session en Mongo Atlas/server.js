const express = require('express');
const session = require('express-session')
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');
const mongoose = require("mongoose");
const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/userRouter");
const util = require('util');
const cookieParser = require('cookie-parser');
const denv = require('dotenv');
const dotenv = denv.config();
const MongoStore = require('connect-mongo');

function print(obj) {
    console.log(util.inspect(obj, false, 12, true));
}

// --- MongoDB Models ---
const Message = require("./db/Message");
const Product = require("./db//Product");

// --- Normalizr ---
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

// --- middlewares ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static("./public"));
//app.use(cookieParser());

// --- Session ---
app.use(session({
    secret: 's3cr3t0',
    resave: true,
    saveUninitialized: true,
    cookie: {
        expires: 60000
    },
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://sanefc:niAWkl7GZf4jwoLC@cluster0.zdtqg.mongodb.net/ecommerce-test?retryWrites=true&w=majority",
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true }
    })
}));

// --- Router ---
app.use("/api", routerAPI);
app.use("/productos", productRouter);
app.use("/user", userRouter);

// --- Server ---
server.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
server.on("error", (error) => console.log("Server Error\n\t", error));

// --- Handlebars ---
app.engine("hbs", handlebars({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views",
    partialsDir: __dirname + "/views/partials"
}));
app.set("views", "./views");
app.set("view engine", "hbs");
app.get('/', (_, res) => res.redirect('/productos'));

// --- Mongoose ---
connect()

function connect() {
    //const URI = process.env.MONGO_ATLAS_URL;
    const URI = "mongodb+srv://sanefc:niAWkl7GZf4jwoLC@cluster0.zdtqg.mongodb.net/ecommerce-test?retryWrites=true&w=majority";
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 1000
    })
        .then(() => console.log('Conectado a la base de datos...'))
        .catch(error => console.log('Error al conectarse a la base de datos', error));
}

// --- Socket.io ---
io.on('connection', (socket) => {
    console.log('Someone is connected');

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

    selectAllMessages();

    Product.find().sort({ '_id': 1 })
        .then(products => {
            socket.emit('productCatalog', { products: products, updateForm: false, viewTitle: "Listado de productos", errorMessage: "No hay productos." });
        })
        .catch(e => {
            console.log('Error getting products: ', e);
        });

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