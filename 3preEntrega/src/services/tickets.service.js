import { TICKETDAO } from "../dao/index.js";
import { CARTSDAO } from "../dao/index.js";
import { USERSDAO } from "../dao/index.js";

export const createTicket = async (uid, cid)=>{
    const user = await USERSDAO.getUserById(uid);
    const cart = await CARTSDAO.getCartById(cid);

    const currentProducts = cart.products.filter((product) => 
        products.includes(product.id)
    );

    const sum = currentProducts.reduce((acc, prev) => {
        acc += prev.price;
        return acc;
    }, 0);

    const orderNumber = Date.now() + Math.floor(Math.random() * 100000 + 1);
    
    const newTicket= {
            purchaser: user.email,
            amount: sum,
            code: orderNumber,
    };
        
    await TICKETDAO.createTicket(newTicket);
};

export const getTickets = async () =>{
    const result = await TICKETDAO.getTickets();
    return result;
};

export const getTicketById = async (ticketId) =>{
    const result = await TICKETDAO.getTicketById(ticketId);
    return result;
};

export const resolveTicket = async () =>{
    
}