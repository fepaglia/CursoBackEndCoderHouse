import { Router } from 'express';
import dBProductManager from '../../dao/dbManager/dbProductManager.js';

const dbproductmanager = new dBProductManager();
const router = Router();

router.get('/:pid', async (req,res) =>{
    let id = req.params.pid;
    try {
        const result = await dbproductmanager.getProductsById(id);
        res.send({ result: 'success', payload: result});
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
});

router.delete('/:pid', async (req,res) =>{
    let id = req.params.pid;    
    try {
        const product = await dbproductmanager.deleteProduct(id);
        res.send({status: "success", payload: product})
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
});

router.put('/:pid', async (req,res)=>{
    let id = req.params.pid;
    const updateObj = req.body;
    try {
        const result = await dbproductmanager.updateProduct(id,updateObj);
        res.send({status:"success", payload: result})
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }

})

router.post('/', async (req,res) =>{
    const {title,description,price,thumbnail,status,code,stock} = req.body;
    try {
        const result = await dbproductmanager.addProduct(
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
  
});

router.get('/', async (req, res)=>{
    try {
        const products = await dbproductmanager.getProducts();
        res.send({ result: 'success', payload: products});
       
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
});

export default router;
