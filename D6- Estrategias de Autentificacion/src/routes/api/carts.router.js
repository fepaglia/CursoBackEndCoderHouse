import { Router } from 'express';
import dBCartManager from '../../dao/dbCartManager.js';
import dBProductManager from '../../dao/dbProductManager.js';

const dbcartmanager = new dBCartManager();
const dbproductmanager = new dBProductManager();
const router = Router();


//Borrar un producto de un carrito:
router.delete('/:cid/products/:pid', async (req,res) =>{
    const prodId = req.params.pid;
    const cartId = req.params.cid;
    try {
        const cart = await dbcartmanager.getCartById(cartId);

        cart.products = cart.products.filter(product => product._id !== prodId);

        await cart.save()
        
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
    
});

//Agregar un producto de l carrito:
router.put('/:cid/products/:pid', async (req,res) =>{
    const prodId = req.params.pid;
    const cartId = req.params.cid;
    try {
        const cart = await dbcartmanager.getCartById(cartId);
        const prod = await dbproductmanager.getProductsById(prodId);


        cart.products.push({pId: prod._id});
        console.log(cart);

        const update = await dbcartmanager.updateCart(cartId, cart)
        res.send({payload: update})
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }

})

//Vaciar un carrito:
router.put('/:cid', async (req,res)=>{
    const id = req.params.cid;
    try {
        const emptyCart = await dbcartmanager.emptyCart(id);
        res.send({result: 'success', payload: emptyCart});
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
})

//Mostrar Carrito especifico:
router.get('/:cid', async (req,res) =>{
    const id = req.params.cid;
    try {
        const cart = await dbcartmanager.getCartById(id);
        res.send({result: 'success', payload: cart});
        
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
})

// Borrar carrito:
router.delete('/:cid', async (req, res)=>{
    const cid = req.params.cid;
    try {
        const deleteCart = await dbcartmanager.deleteCart(cid);
        res.send({result: 'success', payload: deleteCart})
        
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
})

//Llamar a todos los carritos:
router.get('/', async (req,res)=>{
    try {
        const carts = await dbcartmanager.getCarts();
        res.send({ result: 'success', payload: carts});
        
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
})

//Crear Nuevo Carrito:
router.post('/', async (req,res)=>{
    try {
        const newCart = await dbcartmanager.addCart();
        res.send({result: 'success', payload: newCart});

    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
})

export default router;