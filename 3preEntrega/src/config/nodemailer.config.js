import nodemailer from 'nodemailer';
import __dirname  from '../utils.js';

export const transport = nodemailer.createTransport({
    service: 'gmail',
    //puerto de Gmail es 587, c/proveedor tiene un puerto distinto
    port: 587,
    auth: {
        user: 'federicoepaglia@gmail.com',
        //Contrasena exclusiva para nodejs
        pass: 'apasbkxnpzxruenz'
    }
});

const newUser = async (email, name) =>{
    await transport.sendMail({

        from: 'Ecommerce Coderhouse <ecommerce-coderhouse@gmail.com>',
        to: email,
        subject: 'Bienvenido!',
        html:  `<div>
                    <h1>Nuevo Usuario Creado</h1>\n
                    <p>¡Hola ${name}! \n

                    ¡Bienvenido(a) a nuestra comunidad! Nos alegra tenerte como parte de nuestro grupo. \n
                    
                    Estamos aquí para brindarte el mejor servicio y satisfacer todas tus necesidades. Si tienes alguna pregunta, no dudes en contactarnos.
                    
                    \n¡Esperamos que disfrutes de tu experiencia con nosotros!
                    
                    Saludos,\n
                    El equipo de Ecommerce Coderhouse</p>
                </div>`
    });
}

const shopOrder = async (email, name, code, amount) =>{
    await transport.sendMail({

        from: 'Departamento de Ventas Coderhouse <ecommerce-coderhouse@gmail.com>',
        to: email,
        subject: 'Orden de compra',
        html: `<div>
                    <h1>Hola ${name}!! Te informamos, que tu orden de compra esta siendo procesada.</h1>\n
                    <p>Informacion de tu pedido:</p>\n
                    <ul>
                        <li>Codigo de la orden: ${code}</li>
                        <li>Total de la compra: $${amount}</li>
                    </ul>
                    \n
                    <p>Saludos, El equipo de Ecommerce Coderhouse.</p>
                </div>`,
        
    });
}
export {
    newUser,
    shopOrder
}