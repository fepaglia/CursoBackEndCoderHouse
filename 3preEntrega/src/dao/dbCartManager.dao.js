import  cartModel  from './models/carts.model.js';

export default class dBCartManager {
    constructor(){
        console.log('Working carts with DB in mongoDB');
    };

    createCart = async (newCart) =>{
        return await cartModel.create(newCart);
    };

    getCartById = async(cid) =>{
        return await cartModel.findOne({_id: cid});
    };

    updateCart = async (cid, updateCart) =>{
        return await cartModel.updateOne({_id: cid}, updateCart);
    };

    deleteCart = async (cid) =>{
        return await cartModel.deleteOne({_id: cid})
    };

    deleteAllProducts = async (cid) => {
        return await cartModel.updateOne({ _id: cid }, { products: [] });
    };

    deleteOneProduct = async (cid, pid) =>{
        return await cartModel.updateOne(
        { _id: cid },
        { $pull: { products: { product: pid } } }
        );
    };
};