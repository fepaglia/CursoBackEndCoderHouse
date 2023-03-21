import fs from "fs";

class ProductManager {
    constructor(){
        this.products = [];
        this.path = './Productos.json' // Ruta al archivo donde queremos grabar los datos.
    }

//Llama a todos los productos que tengamos, o crea el archivo:
    getProducts = async() =>{

        //Si no existe la ruta, se creara el archivo con un [] vacio.
        if(!fs.existsSync(this.path)) {
            await fs.promises.writeFile(this.path, JSON.stringify([]))
                .then((res)=> console.log(`< ${this.path} > fue creado.`))
                .catch((err) => console.log("Hubo un Problema al crear el archivo. No fue Posible."));
            }

        try {
            const rawdata = await fs.promises.readFile(this.path, 'utf-8')
            const data = JSON.parse(rawdata, null, "\n")
            return data, console.log(data);
             
        } catch (error) {
            console.log(error)
        }
    }

// Agrega un id, que se incrementa de forma dinamica:
    addID = async(product) =>{
        const rawdata = await fs.promises.readFile(this.path, 'utf-8')
        const data = JSON.parse(rawdata, null, "\n")
        if (data.length === 0){
            product.id = 0;
        } else {
            product.id = data[data.length -1].id +1;
            return product
        }    
    }
// Funcion que agrega un producto:
    addProduct = async (title, description, price, thumbnail, code, stock, id) =>{
        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id
        }

        //Validamos que tenga todos los campos
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            console.error(`Complete todos los campos, por favor.`);
        };

        //agregamos el Id Dinamico:
        this.addID(product);
        let rawdata = await fs.promises.readFile(this.path, 'utf-8');
        let data = JSON.parse(rawdata, null, "\n")
        
        // No deben repetirse productos con el mismo campo: code
        if (data.find(prod => prod.code === product.code)) {
            return console.error(`El producto con el code: ${product.code} ya existe:`);
        } else {
            data.push(product);
        }
        
        let prodtoArray = data;

        // Una vez cargados, los datos al array de productos. Lo escribimos en el archivo:
        await fs.promises.writeFile(this.path, JSON.stringify(prodtoArray, null, '\t'))
            .then(()=> {return console.log(`Se agrego ${product.title} sin problemas`)})
            .catch(err => console.log(err))   
    }
// Buscamos el producto con un id especifico. Si existe lo retorna por consola.
    getProductsById = async(id) =>{
        try {
            const rawdata = await fs.promises.readFile(this.path, 'utf-8')
            let data = JSON.parse(rawdata).find(prod => prod.id === id)
            if (!data){
                throw new Error("Not found")
            }else {
                return data, console.log(data);
            }
        } catch (error) {
            return error.message
        }
    }
//Actualiza informacion de un producto especifico:
updateProduct = async(id, updateObj) => {
    try {
        if (!id) {
            throw new Error ("No esxiste el producto con ese id")
        }
            
            let rawdata = await fs.promises.readFile(this.path, 'utf-8');

            let oldProd = JSON.parse(rawdata);

            const productoIndex = oldProd.findIndex(prod=> prod.id === id);

            if (productoIndex === -1) {
                throw new Error(`No se encontró el producto con id ${id}`);
            }
            const newData= {
                ...oldProd[productoIndex],
                ...updateObj,
                id
            }

            oldProd[productoIndex] = newData;
            await fs.promises.writeFile(this.path ,JSON.stringify(oldProd, null, '\t'));

    } catch (error) {
       return error.message
    }
}
// Eliminamos un producto, con un id especifico:
deleteProduct = async(id)=>{
    try { 
        const rawdata = await fs.promises.readFile(this.path, 'utf-8')
        let data = JSON.parse(rawdata);
        const newData = data.filter(prod => prod.id !== id);

        await fs.promises.writeFile(this.path, JSON.stringify(newData, null, "\t"));
        return console.log("Producto eliminado correctamente");    
    } catch (error) {
        return error.message
    }
}
}

// Creamos la instancia de la clase
const productManager = new ProductManager();

//Devuelve la lista de productos. De no existir el archivo crea uno vacio.
productManager.getProducts();

//Agregamos productos de a uno por vez:

//productManager.addProduct("producto prueba1","este es un producto prueba1", 1000, "sin imagen", "1", 25); 
//productManager.addProduct("producto prueba2","este es un producto prueba2", 1000, "sin imagen", "2", 25); 
//productManager.addProduct("producto prueba3","este es un producto prueba3", 1000, "sin imagen", "3", 25);

//Encuentra el producto
//productManager.getProductsById() 

//Actualiza el producto
// productManager.updateProduct(0 ,{
//     title: "updated product",
//     description: "probando Cambios",
//     price: 550,
//     thumbnail: "sin imagen",
//     code: "5",
//     stock: 1
//    });


//Elimina el producto
//productManager.deleteProduct();