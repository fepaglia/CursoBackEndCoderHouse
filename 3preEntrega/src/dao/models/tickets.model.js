import { Schema, model } from "mongoose";

const ticketCollection = 'tickets'

const ticketSchema = new Schema({
    code: {
        type: String
    },
    purchase_datetime: {
        type:  String
    },
    amount:{
        type: Number,
        required: true
    },
    purchaser:{
        type: String,
        require: true
    }
})

const ticketModel = model(ticketCollection, ticketSchema);

export default ticketModel;