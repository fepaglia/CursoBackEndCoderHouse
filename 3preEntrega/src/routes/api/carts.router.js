import { Router } from 'express';
import authorization from '../../utils.js';
import { 
    createCart,
    getCartById,
    updateCart,
    deleteOneProdofCart,
    emptyCart
} from '../../controllers/carts.controller.js';

const router = Router();

//Borrar un producto de un carrito:
router.delete('/:cid/products/:pid', deleteOneProdofCart);

//Agregar un producto de l carrito:
router.put('/:cid/products/:pid', authorization('user'), updateCart);

//Efectuar la compra:
router.post('/:cid/purchase', )

//Vaciar un carrito:
router.put('/:cid', emptyCart);

//Mostrar Carrito especifico:
router.get('/:cid', getCartById);

//Crear Nuevo Carrito:
router.post('/', createCart);

export default router;