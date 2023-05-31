const socket = io();

const form = document.getElementById('productForm');
const outProds = document.getElementById('liveProducts');

document.addEventListener('DOMContentLoaded', () => {
  form.addEventListener('submit', e => {
    e.preventDefault(); 
    const product = new FormData(form);

    const obj = {};
    product.forEach((value, key) => obj[key] = value);
  
    socket.emit('client:createProduct', obj);
  
    console.log(obj);
  });

  const liveProducts = document.getElementById('liveProducts');
  liveProducts.addEventListener('click', e => {
    if (e.target.matches('#eliminar')) {
      e.preventDefault();
      const id = e.target.dataset.id;
  
      console.log("enviando id desde el cliente", id);
      socket.emit('client:deleteProd', id);
    }
  });
});



//Recibimos
socket.on('server:allProds', allProducts => {
  let products = [];
  allProducts.forEach(product => {
    products +=  `
    <div class="prodBox">
      <div><span>ID: </span><p>${product.id}</p></div>
      <div><span>Nombre: </span><p>${product.title}</p></div>
      <div><span>Precio: </span><p>${product.price}</p></div>
      <div><span>Descripcion: </span><p>${product.description}</p></div>
      <div><span>Thumbnails: </span><p>${product.thumbnails}</p></div>
      <div><span>Status: </span><p>${product.status}</p></div>
      <div><span>Status: </span><p>${product.code}</p></div>
      <div><span>Stock: </span><p>${product.stock}</p></div>
      <button id="eliminar" type="submit" data-id="${product.id}">Eliminar</button>
    </div>
    `;
    outProds.innerHTML = products;
  });
});