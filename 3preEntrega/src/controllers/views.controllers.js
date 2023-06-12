import { getProducts as getProductsServices, getProductsById as getProductsByIdServices } from '../services/products.services.js';
import { getCartById as getCartByIdServices } from '../services/carts.services.js';

import UserDto from '../dao/DTOs/users.dto.js';

const productsView = async (req,res)=>{

    const user = req.user;
    const userDto = new UserDto(user);
    
    try {
        const { limit = 10 } = req.query;
        const { page = 1 } = req.query;
        const sort = req.query.sort;
        
        const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } = await getProductsServices(limit, page, sort);
        const products = docs;
        
        
        res.render('products', {
            products,
            user: userDto,
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

const productView = async (req, res) =>{
    const prodId = req.params.pid;
    try {
        const productbyID = await getProductsByIdServices(prodId)
        console.log(productbyID);
        const productData = productbyID.toObject();
        
        res.render('productView', {product: productData , style: 'productView.css'})
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
}

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

const profileView = (req, res) =>{
    try {
        const user = req.user;
        let cart = user.carts;

        
        if (cart.length === 0) {
          cart = null; // Si el array está vacío, asignamos null o puedes manejarlo de otra manera según tus necesidades
        } else {
          cart = cart[cart.length - 1]._id.toString(); // Accedemos al último elemento del array
        console.log('Carrito:', cart)
        }
        
        const userDto = new UserDto(user);
        console.log(userDto);
        
        res.render('profile', { user: userDto, cart });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
};



const publicAccess = (req, res, next) =>{
    if (req.cookies['cookieToken']) return res.redirect('/products');
    next();
};

const privateAccess = (req, res, next) =>{
    if (!req.cookies['cookieToken']) return res.redirect('/login');
    next();
}

export {
    cartView,
    productsView,
    productView,
    profileView,
    publicAccess,
    privateAccess
}