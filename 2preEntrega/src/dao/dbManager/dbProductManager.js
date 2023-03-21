import { productModel } from '../../models/products.js';

export default class dBProductManager {
    constructor(){
        console.log('Working products with DB in mongoDB');
    };

    getProducts = async () =>{
        const productos = await productModel.find();
        return productos.map(prod => prod.toObject());
    };

    addProduct = async (newProduct) =>{
        const productAdded = await productModel.create(newProduct);
        return productAdded;
    };

    getProductsById = async(id) =>{
        const product = await productModel.findOne({_id: id})
        return product;
    };

    updateProduct = async (id, updateProduct) =>{
       const prodMod =  await productModel.updateOne({_id: id}, updateProduct)
        return prodMod;
    };

    deleteProduct = async (id) =>{
        const deletedProduct = await productModel.deleteOne({_id: id})
        return deletedProduct;
    };
};