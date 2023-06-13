import { Router } from 'express';
import { 
    getCarts,
    createCart,
    getCartById,
    updateCart,
    deleteCart,
    deleteOneProdofCart,
    emptyCart,
} from '../../controllers/carts.controller.js';
import { authenticateToken } from '../../config/jwt.config.js';
import { authorizeRol } from '../../config/role.config.js';


const router = Router();

//Borrar un producto de un carrito:
router.delete('/:cid/products/:pid', deleteOneProdofCart);

//Agregar un producto de l carrito:
router.put('/:cid/products/:pid', authenticateToken, authorizeRol('user'),updateCart)

//Vaciar un carrito:
router.put('/:cid', emptyCart)

//Mostrar Carrito especifico:
router.get('/:cid', getCartById)

// Borrar carrito:
router.delete('/:cid', deleteCart)

//Llamar a todos los carritos:
router.get('/', getCarts)

//Crear Nuevo Carrito:
router.post('/', authenticateToken, authorizeRol('user'), createCart)

export default router;