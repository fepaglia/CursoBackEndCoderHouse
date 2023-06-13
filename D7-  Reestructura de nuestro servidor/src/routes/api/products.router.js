import { Router } from 'express';
import {
    getProducts,
    addProduct,
    getProductsById,
    updateProduct,
    deleteProduct
} from '../../controllers/products.controller.js';
import { authenticateToken } from '../../config/jwt.config.js';
import { authorizeRol } from '../../config/role.config.js';

const router = Router();

router.get('/:pid',authenticateToken, authorizeRol('admin') , getProductsById);

router.delete('/:pid', authenticateToken, authorizeRol('admin'), deleteProduct);

router.put('/:pid', authenticateToken, authorizeRol('admin'), updateProduct)

router.post('/', authenticateToken, authorizeRol('admin'), addProduct);

router.get('/', authenticateToken, authorizeRol('admin'), getProducts);

export default router;
