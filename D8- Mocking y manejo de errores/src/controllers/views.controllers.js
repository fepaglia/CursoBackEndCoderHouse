import { getProducts as getProductsServices, getMockingProducts as getMockingProductsServices} from '../services/products.services.js';
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

        const user = req.user;

        res.render('products', {
            products,
            user,
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

const cartView = async (req, res) =>{
    const id = req.params.cid;
    try {
        let cart = await getCartByIdServices(id);

        res.render('carts', cart);
        
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
        
        res.render('products', {products, style: 'products.css'})
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
    res.render('realTimeProducts', { style: 'realtimeproducts.css' });
}
    


export {
    cartView,
    productsView,
    publicAccess,
    privateAccess,
    mockingProductsView
}