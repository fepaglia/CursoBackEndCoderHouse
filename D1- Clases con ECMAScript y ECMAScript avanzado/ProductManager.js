class ProductManager {
    constructor(){
        this.products = [];
    }

//Llama a todos los productos que tengamos:
    getProducts = () =>{
        return this.products;
    }

// Agrega un id, que se incrementa de forma dinamica:
    addID = async(product) =>{
        const data = this.products;
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
        let data = this.products;
        
        // No deben repetirse productos con el mismo campo: code
        if (data.find(prod => prod.code === product.code)) {
            return console.error(`El producto con el code: ${product.code} ya existe:`);
        } else {
            data.push(product);
        }
    }
// Buscamos el producto con un id especifico. Si existe lo retorna por consola.
    getProductsById = async(id) =>{
        const data = this.products;

        data.find(prod => prod.id === id)
        if (!data){
            throw new Error("Not found")
        }else {
            return data, console.log(data);
        }
    }
//Actualiza informacion de un producto especifico:
    updateProduct = async(id, updateObj) => {
        let rawdata = this.products;

        if (!id || rawdata.find( prod => prod.id !== id)) {
            throw new Error ("No esxiste el producto con ese id")
        };
                
        const productoIndex = rawdata.findIndex(prod=> prod.id === id);

        if (productoIndex === -1) {
            throw new Error(`No se encontró el producto con id ${id}`);
        }
        const newData= {
            ...rawdata[productoIndex],
            ...updateObj,
            id
        }

        newData = this.products;
    }
// Eliminamos un producto, con un id especifico:
    deleteProduct = async(id)=>{
        let data = this.products;
        data.filter(prod => prod.id !== id);
        return console.log("Producto eliminado correctamente");    
    
    }
}

// Creamos la instancia de la clase
const productManager = new ProductManager();