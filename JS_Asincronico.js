const mostrarLetras = (texto, delay, callback) => {
    let array = texto.split('')

    const id = setInterval(() => {
        console.log(array.shift())

        if (!array.length) {
            console.log(' ')
            clearInterval(id)
            if (callback) {
              final()
            }
          }
        }, 1000)
        return new Promise(resolve => setTimeout(resolve, delay + array.length * 1000))
}

const final = () => console.log("proceso completo")

// console.log("hola2")

const mostrarTextos = async () => {
    await mostrarLetras("hola", 500)
    await mostrarLetras("como", 500)
    await mostrarLetras("estas", 500, true)

}

mostrarTextos()

