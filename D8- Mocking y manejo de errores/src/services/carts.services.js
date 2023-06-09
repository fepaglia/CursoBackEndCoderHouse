import { CARTSDAO } from "../dao/index.js";

const getCarts = async () =>{
    const carts = await CARTSDAO.getCarts();
    return carts.map(c => c.toObject());
};

const addCart = async (newCart) =>{
    const cartAdded = await CARTSDAO.addCart(newCart);
    return cartAdded;
};

const getCartById = async(cid) =>{
    const searchCart = await CARTSDAO.getCartById(cid)
    return searchCart;
};

const updateCart = async (id, updateCart) =>{
    const update =  await CARTSDAO.updateCart(id, updateCart)
    return update;
};

const deleteCart = async (id) =>{
    const deletedCart = await CARTSDAO.deleteCart(id)
    return deletedCart;
};

const emptyCart = async (cid) => {
    const result = await CARTSDAO.emptyCart(cid);
    return result;
};

export {
    getCarts,
    addCart,
    getCartById,
    updateCart,
    deleteCart,
    emptyCart
};