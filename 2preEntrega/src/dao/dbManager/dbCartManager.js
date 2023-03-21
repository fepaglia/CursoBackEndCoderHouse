import { cartModel } from '../../models/carts.js';

export default class dBCartManager {
    constructor(){
        console.log('Working carts with DB in mongoDB');
    };

    getCarts = async () =>{
        const carts = await cartModel.find();
        return carts.map(c => c.toObject());
    };

    addCart = async (newCart) =>{
        const cartAdded = await cartModel.create(newCart);
        return cartAdded;
    };

    getCartById = async(id) =>{
        const cart = await cartModel.findOne({_id: id})
        return cart;
    };

    updateCart = async (id, updateCart) =>{
       const update =  await cartModel.updateOne({_id: id}, updateCart)
        return update;
    };

    deleteCart = async (id) =>{
        const deletedCart = await cartModel.deleteOne({_id: id})
        return deletedCart;
    };

    emptyCart = async (cid) => {
        try {
          const result = await cartModel.updateOne({ _id: cid }, { products: [] });
          return result;
        } catch (error) {
          console.log(error);
        }
    };
};