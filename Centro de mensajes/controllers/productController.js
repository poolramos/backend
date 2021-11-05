const Product = require('../db/Product');
const Message = require('../db/Message');
const faker = require('faker');

//Función generadora de productos.
faker.locale = 'es'

function genProducts(cant) {
    const generatedProducts = [];
    let r = 0;

    for (let i = 0; i < cant; i++) {
        generatedProducts.push({
            id: faker.datatype.uuid(),
            title: faker.commerce.product(),
            thumbnail: `${faker.image.technics()}?random=${r++}`,
            price: faker.commerce.price(),
        })
    }

    return generatedProducts;
}

const productController = {
    listProducts: (req, res) => {
        Product.find().sort({ '_id': 1 })
            .then(products => {
                if (products.length) {
                    //, { ok: true, updateForm: false, error: null, products: products }
                    res.render('index')
                } else {
                    res.render('index', { ok: false, error: 'No hay products cargados', productos: [] })
                }
            })
            .catch(e => {
                console.log('Error getting products: ', e);
            })
    },
    testView: (req, res) => {
        const fakeProds = genProducts(req.params.cant);

        console.log(fakeProds);

        if (fakeProds.length > 0) {
            return res.render('index', { testView: true, fakeProds: fakeProds })
        } else {
            return res.render('index', { testView: true, fakeProds: [] })
        }
    },
    addProduct: (req, res) => {
        Product.create(req.body)
            .then(() => {
                console.log('producto insertado');
                res.redirect('/productos')
            })
            .catch(e => {
                console.log('Error en Insert producto: ', e);
            });
    },
    showEditProduct: (req, res) => {
        let currentID = req.params.id;

        Product.findById(currentID)
            .then(prod => {
                console.log(prod);
                res.render('index', {
                    id: prod._id,
                    title: prod.title,
                    thumbnail: prod.thumbnail,
                    price: prod.price,
                    updateForm: true,
                    viewTitle: "Editar producto",
                    errorMessage: "No hay productos."
                })
            })
            .catch(e => {
                console.log('Error getting products: ', e);
            });
    },
    editProduct: (req, res) => {
        let id = req.params._id;
        console.log(req.body);

        Product.findByIdAndUpdate(id, req.body)
            .then(prod => {
                console.log('producto actualizado: ', prod);
                res.redirect('/productos');
            })
            .catch(e => {
                console.log('Error en Update producto: ', e);
            });
    },
    deleteProduct: (req, res) => {
        let id = req.params.idprod;
        Product.findByIdAndDelete(id)
            .then(prod => {
                console.log('producto eliminado: ', prod);
                res.redirect('/productos');
            })
            .catch(e => {
                console.log('Error en Delete producto: ', e);
            });
    }
}

module.exports = productController;