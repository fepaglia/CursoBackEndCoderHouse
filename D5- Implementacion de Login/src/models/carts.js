import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const cartCollection = 'carts';

const cartSchema =  new mongoose.Schema(
    {
        products: {
            type: [
              {
                pId: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "products",
                },
                quantity: {
                  type: Number,
                  default: 1,
                },
              },
            ],
            default: []
          }
    }
);

cartSchema.plugin(mongoosePaginate)

cartSchema.pre('findOne', function (){
    this.populate('products.pId')
});

export const cartModel = mongoose.model(cartCollection, cartSchema);