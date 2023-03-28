import productModel from '../../models/products.model.js';

export default class dBProductManager {
    constructor(){
        console.log('Working products with mongoDB');
    };

    getProducts = async (limit, page, sort) =>{
                if (sort) {
                    let sortOption = {};
                    if (sort === "asc") {
                        sortOption = { price: 'asc' };
                    } else if (sort === "desc") {
                        sortOption = { price: 'desc' };
                    }
                    sort = sortOption;
                }
        const products = await productModel.paginate({}, { limit, page, sort, lean: true });
        return products;
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