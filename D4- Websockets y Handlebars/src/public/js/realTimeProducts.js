const socket = io();
import ProductManager from "../../manager/ProductManager";
const productmanager = new ProductManager();

//enviar esta informacion por websockets
const showProducts = await productmanager.getProducts();

//Tengo que capturar la informacion del formulario
productmanager.addProduct();

let formulario = document.querySelector('formulario');

const products = document.getElementById('liveproducts');



formulario.addEventListener('submit', evento =>{
  evento.preventDefault();
  const product = {
    title: formulario.title.value,
    description: formulario.description.value,
    price: formulario.price.value,
    thumbnail: formulario.thumbnail.value,
    status: formulario.status.value,
    code: formulario.code.value,
    stock: formulario.stock.value,
  };
socket.emit('submit', productmanager.addProduct(product)); 
})


