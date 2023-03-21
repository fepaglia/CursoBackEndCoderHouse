import express from'express';
import ProductManager from './manager/ProductManager.js';

const app = express();
const productmanager = new ProductManager();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/products', async(req, res)=>{
    const products = await productmanager.getProducts();
    const limit = Number(req.query.limit);

    if (!limit){
        res.send({products});
    }else {
        const limitedProducts = products.slice(0, limit);
        res.send({limitedProducts});
    };
})

app.get('/products/:pid', async (req,res) =>{
    let id = Number(req.params.pid);
    const product = await productmanager.getProductsById(id);
    res.send({product})
})

app.listen(8080, ()=> console.log("Server on port 8080"));