import {
    getProducts as getProductsServices ,
    addProduct as addProductServices,
    getProductsById as getProductsByIdServices,
    updateProduct as updateProductServices,
    deleteProduct as deleteProductServices
} from '../services/products.services.js';

import CustomError from '../services/errors/CustomError.js';
import EErrors from '../services/errors/enums.js';
import { generateProductsErrorInfo } from '../services/errors/info.js';


const getProducts = async (req, res)=>{
    try {
        const products = await getProductsServices();
        res.send({ result: 'success', payload: products});
       
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
};

const addProduct =  async (req,res) =>{
    const {title,description,price,thumbnail,status,code,stock} = req.body;
    
    //CUSTOM ERROR:
            if(!title || !description || !price || !status || !code || !stock) {
                throw CustomError.createError({
                    name: 'Product Error',
                    cause: generateProductsErrorInfo({
                        title,description,price,status,code,stock
                    }),
                    code: EErrors.INCOMPLETE_FIELDS_PRODUCTS_ERROR,
                    message: 'Error tratando de crear un producto'
                });
            };
    
    try {

        const result = await addProductServices(
        {
            title,
            description,
            price,
            thumbnail,
            status,
            code,
            stock
        }
    );
        res.send({ result: 'success', payload: result});
        
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
  
};

const getProductsById =  async (req,res) =>{
    let id = req.params.pid;
    try {
        const result = await getProductsByIdServices(id);
        res.send({ result: 'success', payload: result});
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
};

const updateProduct =  async (req,res)=>{
    let id = req.params.pid;
    const updateObj = req.body;
    try {
        const result = await updateProductServices(id,updateObj);
        res.send({status:"success", payload: result})
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }

};

const deleteProduct = async (req,res) =>{
    let id = req.params.pid;    
    try {
        const product = await deleteProductServices(id);
        res.send({status: "success", payload: product})
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
};

export {
    getProducts,
    addProduct,
    getProductsById,
    updateProduct,
    deleteProduct
};