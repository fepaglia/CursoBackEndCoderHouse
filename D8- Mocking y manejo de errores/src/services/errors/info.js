export const generateUserErrorInfo = (user) =>{
    return `Una o mas propiedades estan incompletas, o son invalidas.
    Revisar: Nombre:${user.first_name}, Apellido:${user.last_name}, Edad:${user.age} o Email:${user.email}`
}

export const generateProductsErrorInfo = (product) =>{
   if (!product){
        return `Para poder crear un producto debe completar todos los campos`
   };
   if (!product.price || !product.price) {
        return `Recuerde que los campos TITLE y PRICE son obligatorios`
   };
}