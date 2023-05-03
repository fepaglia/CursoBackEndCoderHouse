import { PRODUCTSDAO } from "../dao/index.js";

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

const deleteProduct = async (pid) =>{
    const eraseProd = await PRODUCTSDAO.deleteProduct(pid);

    const actualProds = await PRODUCTSDAO.getProducts();

    io.emit('realTimeProducts', actualProds);

    return eraseProd;
};

export {
    getProducts,
    addProduct,
    getProductsById,
    updateProduct,
    deleteProduct
};