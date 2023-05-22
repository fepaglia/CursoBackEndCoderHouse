import { PRODUCTSDAO } from "../dao/index.js";
import {generateProducts} from '../config/faker.config.js';

const getProducts = async (limit, page, sort) =>{
    const products = await PRODUCTSDAO.getProducts(limit, page, sort);
    return products;
};

const addProduct = async (newProduct) =>{
    const productAdded = await PRODUCTSDAO.addProduct(newProduct);
    return productAdded;
};

const getProductsById = async (id) =>{
    const product = await PRODUCTSDAO.getProductsById(id)
    return product;
};

const updateProduct = async (id, updateProduct) =>{
    const prodMod =  await PRODUCTSDAO.updateProduct(id, updateProduct);
    return prodMod;
};

const deleteProduct = async (id) =>{
    const deletedProduct = await PRODUCTSDAO.deleteProduct(id)
    return deletedProduct;
};


const getMockingProducts = async () =>{
    let mockingProducts = [];

    for (let i = 0 ; i < 100; i ++) {
        mockingProducts.push(generateProducts());
    }

    return mockingProducts;
}

export {
    getProducts,
    addProduct,
    getProductsById,
    updateProduct,
    deleteProduct,
    getMockingProducts
};