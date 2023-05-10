import { Schema, model } from 'mongoose';

const ticketCollection = 'ticket';

const ticketSchema = new Schema(
    {
        code: {
            type: String,
            unique: true,
            require: true,
          },
        amount: {
            type: Number,
            require: true,
          },
        purchaser: {
            type: String,
            require: true,
          },
    },
    {
        timestamps: {
            createdAt: "purchase_datetime",
          },
        versionKey: false
    }
);

const ticketModel = model(ticketCollection, ticketSchema);

export default ticketModel;