var admin = require("firebase-admin");

var serviceAccount = require("../db/firebase/base-de-datos-33c57-firebase-adminsdk-j89ze-9760f4100e.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


class FirebaseDao{ 
  constructor() {
    this.producto = "";
  }
createProduct(producto){
 (async () => {
    const db = admin.firestore();
    const collection = db.collection("productos");
  
    try {
      console.log("CREATE");
  
      let id;
      let doc = collection.doc(id.toString());
      await doc.create(producto);
      id++;
      console.log("Datos insertados");
    } catch (error) {
      console.log(error);
    }
  })(); 
    console.log(`Insertando ${producto.name} en Firebase`)
}

readProduct(){
  (async () => {
    const db = admin.firestore();
    const collection = db.collection("productos");
  
    try {  
      console.log("READ ALL");
      const queryGet = await collection.get();
      const response = queryGet.docs.map((doc) => {
      const data = doc.data();
  
        return {
          id: doc.id,
          name: data.name,
          descrption: data.descrption,
          code: data.code,
          thumbnail: data.thumbnail,
          price: data.price,
          stock: data.stock
        };
      });
  
      console.log(response);
  
    } catch (error) {
      console.log(error);
    }
  })();
    console.log(`Leyendo los productos en Firebase`)
}
updateProduct(producto, data){
  (async () => {
    const db = admin.firestore();
    const collection = db.collection("productos");
  
    try {
      console.log("UPDATE");
      let doc = collection.doc("1")
      doc = await doc.update({
        price: 450,
      });
      
      console.log(doc);
    } catch (error) {
      console.log(error);
    }
  })();
    console.log(`Actualizando producto en Firebase`)
}
deleteProduct(id){
  (async () => {
    const db = admin.firestore();
    const collection = db.collection("productos");
  
    try {
      console.log("DELETE");
      let doc = collection.doc(id)
      doc = await doc.delete();
      console.log(doc);
      
    } catch (error) {
      console.log(error);
    }
  })();
    console.log(`Borrando producto en Firebase`)
}
}

module.exports = new FirebaseDao()