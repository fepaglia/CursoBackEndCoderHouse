import { getProducts as getProductsServices, getProductsById as getProductsByIdServices, getMockingProducts as getMockingProductsServices} from '../services/products.services.js';
import { getCartById as getCartByIdServices } from '../services/carts.services.js'

import CustomError from '../services/errors/CustomError.js';
import EErrors from '../services/errors/enums.js';
import { generateProductsErrorInfo } from '../services/errors/info.js';


const productsView = async (req,res)=>{
    try {
        const { limit = 10 } = req.query;
        const { page = 1 } = req.query;
        const sort = req.query.sort;

        const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } = await getProductsServices(limit, page, sort);
        const products = docs;

        const user = req.session.user;

        const cartId= user.carts[0]._id;

        res.render('products', {
            products,
            user,
            cartId,
            hasPrevPage, 
            hasNextPage,
            nextPage, 
            prevPage, 
            style: 'products.css'
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
};

const productDetailView = async (req, res) =>{
    const id = req.params.id;
    try {
        
        const product = await getProductsByIdServices(id);

        res.render('productView', {product, style: 'productdetail.css'});
        
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
};


const cartView = async (req, res) =>{
    const id = req.params.cid;
    try {
        let cart = await getCartByIdServices(id);

        console.log("CARRITO",cart.id);
        console.log(cart)

        const user = req.session.user;

        res.render('carts', {cart, user});
        
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
}

const publicAccess = (req, res, next) =>{
    if(req.session.user) return res.redirect('/products');
    next();
};

const privateAccess = (req, res, next) =>{
    if(!req.session.user) return res.redirect('/login');
    next();
}


const mockingProductsView = async (req, res) =>{
    try {
        let products = await getMockingProductsServices();
        
        res.render('mocking', {products, style: 'products.css'})
    } catch (error) {
        console.log(error)
    }

}


export const liveProduct = async (req,res, next)=>{

    const {title,description,price,thumbnail,status,code,stock} = req.body;

    
      //CUSTOM ERROR:
      if(!title || !description || !price || !status || !code || !stock) {
        const err =  CustomError.createError({
            name: 'Product Error',
            cause: generateProductsErrorInfo({
                title,description,price,status,code,stock
            }),
            code: EErrors.INCOMPLETE_FIELDS_PRODUCTS_ERROR,
            message: 'Error tratando de crear un producto'
        });
        throw err;
      };

    next();
    res.render('mocking', { style: 'mocking.css' });
}
    


export {
    cartView,
    productsView,
    productDetailView,
    publicAccess,
    privateAccess,
    mockingProductsView
}