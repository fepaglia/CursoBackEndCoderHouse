import { Router } from 'express';
import {
    getProducts,
    addProduct,
    getProductsById,
    updateProduct,
    deleteProduct
} from '../../controllers/products.controller.js';

const router = Router();

router.get('/:pid', getProductsById);

router.delete('/:pid', deleteProduct);

router.put('/:pid', updateProduct)

router.post('/', addProduct);

router.get('/', getProducts);

export default router;
