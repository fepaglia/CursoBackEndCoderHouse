
export default class ProductManager {
    constructor(){
        this.products = [];
    }

//Llama a todos los productos que tengamos, o crea el archivo:
    getProducts = () =>{
        try {
            return this.products;
             
        } catch (error) {
            console.log(error)
        }
    }

// Agrega un id, que se incrementa de forma dinamica:
    addID = (product) =>{
        const data = this.products;
        if (data.length === 0){
            product.id = 0;
        } else {
            product.id = data[data.length -1].id +1;
            return product
        }    
    }
// Funcion que agrega un producto:
    addProduct = (title, description, price, thumbnail, code, stock, id) =>{
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
        
        let data = this.products;
        
        // No deben repetirse productos con el mismo campo: code
        if (data.find(prod => prod.code === product.code)) {
            return console.error(`El producto con el code: ${product.code} ya existe:`);
        } else {
            data.push(product);
        }
        return `\nEl producto con el nombre ${product.title}, se agrego correctamente`;
    }
// Buscamos el producto con un id especifico. Si existe lo retorna por consola.
    getProductsById = (id) =>{
        try {
            const data = this.products.find(prod => prod.id === id);

            if (!data){
                return `El producto con el id indicado no existe`
            }else {
                return data;
            }
        } catch (error) {
            console.log(error)
        }
    }
//Actualiza informacion de un producto especifico:
updateProduct = (id, updateObj) => {
    try {
        if (!id) {
            console.log("Se necesita un id valido, para actualizar el producto");
        }
        
        const data = this.products;

        const productoIndex = data.findIndex(prod=> prod.id === id);

        if (data === -1) {
            throw new Error(`No se encontró el producto con id ${id}`);
        }
        const newData= {
            ...data[productoIndex],
            ...updateObj,
            id
        }

        data[productoIndex] = newData;

        return `\nEl producto con el id: ${id}, se actualizo correctamente`;

    } catch (error) {
       return error.message
    }
}
// Eliminamos un producto, con un id especifico:
deleteProduct = (id) =>{
    if (!id) {
        console.log("Se necesita un id valido, eliminar el producto");
    }
    
    try { 
        let data = this.products.findIndex(prod => prod.id === id);
        
        if (data !== -1) {
            this.products.splice(data, 1);
        }

        return `El producto con el id: ${id}, se elimino correctamente`;    
    } catch (error) {
        return error.message
    }
}
}

const pm = new ProductManager()
console.log("paso 1:",pm.getProducts());
console.log("paso 2 agregar:", pm.addProduct("producto Prueba", "prueba", "200", "sin imagen", "abc123", "25"))
console.log("confirmar:", pm.getProducts());
console.log("paso3 llamar por id:", pm.getProductsById(0))
let update = {
    title: "update", 
    description: "test", 
    price: "2000", 
    thumbnail: "sin imagen", 
    code: "abc123", 
    stock: "25"};
console.log("paso 4 update product:", pm.updateProduct(0,update));
console.log("confirmar:", pm.getProducts());
console.log("paso 5 delete:", pm.deleteProduct(0));
console.log("confirmar:", pm.getProducts());
