import { CARTSDAO } from "../dao/index.js";


const createCart = async (newCart) =>{
    const result = await CARTSDAO.createCart(newCart);
    return result;
};

const getCartById = async(cid) =>{
    const result = await CARTSDAO.getCartById(cid)
    return result;
};

const updateCart = async (id, updateCart) =>{
    const update =  await CARTSDAO.updateCart(id, updateCart)
    return update;
};

const emptyCart = async (id) =>{
    const result = await CARTSDAO.deleteAllProducts(id)
    return result;
};

const deleteOneProduct = async (cid, pid) =>{
    const deleteOne = await CARTSDAO.deleteOneProduct(cid, pid);
    return deleteOne;
};

export {
    createCart,
    getCartById,
    updateCart,
    emptyCart,
    deleteOneProduct
};