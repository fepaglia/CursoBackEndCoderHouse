import { getProducts as getProductsServices, getMockingProducts as getMockingProductsServices} from '../services/products.services.js';
import { getCartById as getCartByIdServices } from '../services/carts.services.js'


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

export {
    cartView,
    productsView,
    publicAccess,
    privateAccess,
    mockingProductsView
}