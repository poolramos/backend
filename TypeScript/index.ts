async function operacion(num1:number, num2:number, cuenta:string) {

    let resultado:number=0;
    let modulo;

    switch(cuenta){

    case "suma":{ 
         modulo = await import("./add");
         let suma = new modulo.suma(num1, num2);
         resultado = suma.resultado();
         return Promise.resolve(resultado);
    }
    case "resta":{
         modulo = await import("./substract");
         let resta = new modulo.resta(num1, num2);
         resultado = resta.resultado();
         return Promise.resolve(resultado);
    }
    }
}

const operaciones = async () => {
    const cuentaSuma = await operacion(4, 2, 'suma')
    const cuentaResta = await operacion(4, 2, 'resta')
  
    console.log('Suma: ', cuentaSuma)
    console.log('Resta: ', cuentaResta)
  }
  
  operaciones()

