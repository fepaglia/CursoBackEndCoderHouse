import ticketModel from "./models/tickets.model.js";

export default class dBTicketManager{
    constructor(){};

    createTicket = async(ticket) => {
        return await ticketModel.create(ticket)
    };

    getTickets = async ()=> {
        const result = await ticketModel.find();
        return result;
    };

    getTicketById = async (ticketId)=>{
        const result = await ticketModel.findById(ticketId);
        return result;
    };

    resolveTicket = async (id, content)=>{
        const result = await ticketModel.findOneAndUpdate(id, content);
        return result;
    };
};