document.addEventListener('DOMContentLoaded', () => {
    const purchaseButton = document.querySelectorAll('.purchase');
  
    purchaseButton.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
  
            const cartId = event.target.dataset.cart;

            console.log(cartId)
  
            // Construir la URL para la solicitud a la API
            const url = `/api/carts/${cartId}/purchase`;
  
            // Realizar la solicitud a la API
            fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(result =>{
                if(result.status === 200){        
                    location.href = "/products"
            }});
        });
    });
});
  