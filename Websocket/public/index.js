// Sockets desde el cliente
const socket = io();
//selecciono los elementos del html
const inputTitulo = document.querySelector("#title")
const inputPrecio = document.querySelector("#price")
const inputThumbnail = document.querySelector("#thumbnail")

const enviar = document.querySelector("#send")
const listado = document.querySelector("#list")

socket.on('productos', productos => {
    console.log(productos)
    //escucho evento productos y cargo los productos en el html
listado.innerHTML = productos.map(p => { 
    return `Nombre: ${p.title} -  Precio: ${p.price} -  img: ${p.thumbnail}` 
}).join('<br>')
});

enviar.addEventListener('click', () => {
    //envio producto nuevo con el Precio de los input
    socket.emit('productoNuevo', {title: inputTitulo.value, price: inputPrecio.value, thumbnail: inputThumbnail.value})
    //limpio los input
    // inputNombre.value = null
    // inputPrecio.value = null
    // inputThumbnail.value = null
})
